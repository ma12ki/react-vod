import * as cuid from 'cuid';

import { store as set, retrieve as get } from './store';

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

const store = (files: INewVideoFile[]) => {
    const prevFiles = retrieve();

    const newFiles: IVideoFile[] = files.map((file) => {
        const prevFile = prevFiles.find((prevFile) => prevFile.path === file.path && prevFile.size === file.size);

        if (prevFile) return prevFile;
        return {
            ...file,
            id: cuid(),
        };
    });

    set(storeKey, newFiles);
    return newFiles;
};

const retrieve: () => IVideoFile[] = () => (get(storeKey) || []);

export {
    store,
    retrieve,
};
