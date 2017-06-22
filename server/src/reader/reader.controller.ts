import * as path from 'path';

import { readdir, stat } from './utils/fs-promisified';

interface IVideoFile {
    id: string;
    path: string;
    name: string;
    size: number;
    duration: number;
    dateCreated: Date;
    dateModified: Date;
}

const getVideoFiles = async (dirs: string[]): Promise<IVideoFile[]> => {
    const promises = dirs.map((dir) => {
        return getVideoFilesRecursive(dir);
    });
    return Promise.all(promises)
        .then((videoFileArrays: IVideoFile[][]) => {
            return flatten(videoFileArrays);
        });
};

const getVideoFilesRecursive = async (dir: string): Promise<IVideoFile[]> => {
    const stats = await stat(dir);
    if (stats.isDirectory()) {
        const subDirs = await readdir(dir);
        const absoluteSubDirs = subDirs.map((subDir) => path.join(dir, subDir));
        const subVideoFiles = await Promise.all(absoluteSubDirs.map((subDir) => getVideoFilesRecursive(subDir)));
        return flatten(subVideoFiles);
    } else {
        return [
            {
                id: '1',
                path: dir,
                name: 'lol',
                size: 1,
                duration: 11,
                dateCreated: new Date(),
                dateModified: new Date(),
            }
        ];
    }
};

const flatten: (arr: any[][]) => any[] = (array) => array.reduce((flattened, arr) => flattened.concat(arr), []);

export {
    IVideoFile,
    getVideoFiles,
};
