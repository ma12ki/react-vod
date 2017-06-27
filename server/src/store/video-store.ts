import * as cuid from 'cuid';
import { injectable, inject } from 'inversify';

import { storeTypes } from './store.types';
import { IStore, store } from './store';

const storeKey = 'VIDEO_FILES';

export interface INewVideoFile {
    path: string;
    name: string;
    ext: string;
    title: string;
    size: number;
    duration: number;
    dateCreated: Date;
    dateModified: Date;
}

export interface IVideoFile extends INewVideoFile {
    id: string;
}

export interface IVideoStore {
    get: () => Promise<IVideoFile[]>;
    getOne: (id: string) => Promise<IVideoFile>;
    set: (videoFiles: INewVideoFile[]) => Promise<IVideoFile[]>;
}

@injectable()
class VideoStore implements IVideoStore {
    constructor(
        @inject(storeTypes.store) private store: IStore,
    ) {}
    public get: () => Promise<IVideoFile[]> = async () => {
        const videoFiles = await this.store.get(storeKey);
        return videoFiles || [];
    }
    public getOne: (id: string) => Promise<IVideoFile> = async (id) => {
        const videoFiles = await this.get();
        return videoFiles.find((v) => v.id === id);
    }
    public set: (videoFiles: INewVideoFile[]) => Promise<IVideoFile[]> = async (videoFiles) => {
        const prevFiles = await this.get();

        const newFiles: IVideoFile[] = videoFiles.map((file) => {
            const prevFile = prevFiles.find((prevFile) => prevFile.path === file.path && prevFile.size === file.size);

            if (prevFile) return prevFile;
            return {
                ...file,
                id: cuid(),
            };
        });

        await this.store.set(storeKey, newFiles);
        return newFiles;
    }
}

export { VideoStore };
