import * as slug from 'slug';
import * as uid from 'uid-safe';
import { injectable, inject } from 'inversify';

import { storeTokens } from './store.tokens';
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
        @inject(storeTokens.store) private store: IStore,
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

        const newFilePromises: Promise<IVideoFile>[] = videoFiles.map(async (file) => {
            const prevFile = prevFiles.find((prevFile) => prevFile.path === file.path && prevFile.size === file.size);

            if (prevFile) return prevFile;
            const id = await this.uniqueId(file.name);
            return {
                ...file,
                id,
            };
        });

        const newFiles: IVideoFile[] = await Promise.all(newFilePromises);

        await this.store.set(storeKey, newFiles);
        return newFiles;
    }
    private uniqueId: (name: string) => Promise<string> = async (name) => {
        const uniquePart = await uid(4);
        const id = slug(`${name}_${uniquePart}`);
        return id;
    }
}

export { VideoStore };
