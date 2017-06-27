import { inject, injectable } from 'inversify';
import * as path from 'path';
import * as fs from 'fs';
import * as _ from 'lodash';

import { configTypes } from '../config';
import { storeTypes, IVideoStore, IVideoFile, INewVideoFile } from '../store';

import { probe } from '../utils/fs-promisified';
import recursiveFileLister, { IFileInfo } from '../utils/recursive-file-lister';

export interface IReader {
    getVideoFiles: () => Promise<IVideoFile[]>;
    refreshVideoFiles: () => Promise<IVideoFile[]>;
}

@injectable()
class ReaderService implements IReader {
    constructor(
        @inject(configTypes.videoFileDirs) private dirs: string[],
        @inject(storeTypes.videoStore) private store: IVideoStore,
    ) {}

    public getVideoFiles: () => Promise<IVideoFile[]> = async () => this.store.get();
    public refreshVideoFiles: () => Promise<IVideoFile[]> = async () => {
        const promises = this.dirs.map((dir) => {
            return recursiveFileLister(dir);
        });
        const fileArrays = await Promise.all(promises);
        const videoFiles = await Promise.all(_.flatten(fileArrays)
            .filter((file: IFileInfo) => this.isVideoFile(file.path))
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

        const savedFiles = await this.store.set(videoFiles);
        return savedFiles;
    };

    private isVideoFile: (dir: string) => boolean = (dir) => {
        return !!path.extname(dir).replace('.', '').match(/mp4|webm/i);
    };
}

export { ReaderService };