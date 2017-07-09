import * as path from 'path';
import * as fs from 'fs';
import * as _ from 'lodash';
import { inject, injectable } from 'inversify';

import { configTokens } from '../config';
import { utilsTokens, IFsp } from '../utils';
import { storeTokens, IVideoStore, IVideoFile, INewVideoFile } from '../store';

import { IFileInfo } from '../utils';

export interface IReader {
    getVideoFiles: () => Promise<IVideoFile[]>;
    getVideoFile: (id: string) => Promise<IVideoFile>;
    refreshVideoFiles: () => Promise<IVideoFile[]>;
}

@injectable()
export class ReaderService implements IReader {
    constructor(
        @inject(configTokens.videoFileDirs) private dirs: string[],
        @inject(utilsTokens.fsp) private fsp: IFsp,
        @inject(storeTokens.videoStore) private store: IVideoStore,
    ) {}

    public getVideoFiles: () => Promise<IVideoFile[]> = async () => this.store.get();
    public getVideoFile: (id: string) => Promise<IVideoFile> = async (id) => this.store.getOne(id);
    public refreshVideoFiles: () => Promise<IVideoFile[]> = async () => {
        const promises = this.dirs.map((dir) => {
            return this.fsp.getFilesRecursive(dir);
        });
        const fileArrays = await Promise.all(promises);
        const videoFiles = await Promise.all(_.flatten(fileArrays)
            .filter((file: IFileInfo) => this.isVideoFile(file.path))
            .map(async (file: IFileInfo) => {
                const probeData = await this.fsp.probe(file.path);
                const videoFile: INewVideoFile = {
                    path: file.path,
                    name: path.basename(file.path, probeData.fileext),
                    ext: probeData.fileext,
                    title: `${probeData.metadata.title || ''}`,
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
