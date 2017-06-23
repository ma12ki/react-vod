import * as path from 'path';

import { readdir, stat, probe } from './utils/fs-promisified';

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
        if (isVideoFile(dir)) {
            const probeData = await probe(dir);
            return [
                {
                    id: '1',
                    path: dir,
                    name: path.basename(dir),
                    size: stats.size,
                    duration: probeData.format.duration,
                    dateCreated: stats.ctime,
                    dateModified: stats.mtime,
                }
            ];
        }
        return [];
    }
};

const isVideoFile = (dir: string): boolean => {
    return !!path.extname(dir).replace('.', '').match(/mp4|webm/i);
};

const flatten: (arr: any[][]) => any[] = (array) => array.reduce((flattened, arr) => flattened.concat(arr), []);

export {
    IVideoFile,
    getVideoFiles,
};
