import * as path from 'path';
import * as fs from 'fs';
import * as cuid from 'cuid';
import * as _ from 'lodash';

import { probe } from './utils/fs-promisified';
import recursiveFileLister, { IFileInfo } from './utils/recursive-file-lister';

interface IVideoFile {
    id: string;
    path: string;
    name: string;
    ext: string;
    title: string;
    size: number;
    duration: number;
    dateCreated: Date;
    dateModified: Date;
}

const getVideoFiles = async (dirs: string[]): Promise<IVideoFile[]> => {
    const promises = dirs.map((dir) => {
        return recursiveFileLister(dir);
    });
    const fileArrays = await Promise.all(promises);
    const videoFiles = await Promise.all(_.flatten(fileArrays)
        .filter((file: IFileInfo) => isVideoFile(file.path))
        .map(async (file: IFileInfo) => {
            const probeData = await probe(file.path);
            const videoFile: IVideoFile = {
                id: cuid(),
                path: file.path,
                name: path.basename(file.path, probeData.fileext),
                ext: probeData.fileext,
                title: probeData.metadata.title,
                size: file.size,
                duration: probeData.format.duration,
                dateCreated: file.ctime,
                dateModified: file.mtime,
            };
            return videoFile;
        }));
    return videoFiles;
};

const isVideoFile = (dir: string): boolean => {
    return !!path.extname(dir).replace('.', '').match(/mp4|webm/i);
};

export {
    IVideoFile,
    getVideoFiles,
};
