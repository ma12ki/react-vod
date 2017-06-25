import * as path from 'path';
import * as fs from 'fs';
import * as _ from 'lodash';

import { IVideoFile, INewVideoFile, store, retrieve } from '../store/video-file-store';
import { probe } from './utils/fs-promisified';
import recursiveFileLister, { IFileInfo } from './utils/recursive-file-lister';

const getVideoFiles = async () => retrieve();

const refreshVideoFiles = async (dirs: string[]): Promise<IVideoFile[]> => {
    const promises = dirs.map((dir) => {
        return recursiveFileLister(dir);
    });
    const fileArrays = await Promise.all(promises);
    const videoFiles = await Promise.all(_.flatten(fileArrays)
        .filter((file: IFileInfo) => isVideoFile(file.path))
        .map(async (file: IFileInfo) => {
            const probeData = await probe(file.path);
            const videoFile: INewVideoFile = {
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

    const savedFiles = store(videoFiles);
    return savedFiles;
};

const isVideoFile = (dir: string): boolean => {
    return !!path.extname(dir).replace('.', '').match(/mp4|webm/i);
};

export {
    getVideoFiles,
    refreshVideoFiles,
};
