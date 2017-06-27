import * as path from 'path';
import * as fs from 'fs';
import * as _ from 'lodash';

import { readdir, stat, probe } from './fs-promisified';

export interface IFileInfo extends fs.Stats {
    path: string;
}

const getFilesRecursive = async (dir: string): Promise<IFileInfo[]> => {
    const stats = await stat(dir);
    if (stats.isDirectory()) {
        const subDirs = await readdir(dir);
        const absoluteSubDirs = subDirs.map((subDir) => path.join(dir, subDir));
        const subFiles = await Promise.all(absoluteSubDirs.map((subDir) => getFilesRecursive(subDir)));
        return _.flatten(subFiles);
    }
    return [{
        path: dir,
        ...stats,
    }];
};

export default getFilesRecursive;
