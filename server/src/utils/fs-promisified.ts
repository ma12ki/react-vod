import * as path from 'path';
import * as fs from 'fs';
import * as util from 'util';
import * as _ from 'lodash';
import ffprobe = require('node-ffprobe');

const stat = util.promisify(fs.stat) as (path: string) => Promise<fs.Stats>;
const readdir = util.promisify(fs.readdir) as (path: string) => Promise<string[]>;

interface IStream {
    width: number;
    height: number;
}
interface IFormat {
    start_time: number;
    duration: number;
    size: number;
}
interface IMetadata {
    title: string;
}
export interface IProbeData {
    filename: string;
    filepath: string;
    fileext: string;
    file: string;
    streams: IStream[];
    format: IFormat;
    metadata: IMetadata;
}

const probe: (track: string) => Promise<IProbeData> = (track) => {
    return new Promise((resolve, reject) => {
        ffprobe(track, (err: any, probeData: IProbeData) => {
            if (err) return reject(err);
            return resolve(probeData);
        });
    });
};

export interface IFileInfo extends fs.Stats {
    path: string;
}

const getFilesRecursive: (dir: string) => Promise<IFileInfo[]> = async (dir) => {
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

export interface IFsp {
    stat: (path: string) => Promise<fs.Stats>;
    readdir: (path: string) => Promise<string[]>;
    probe: (track: string) => Promise<IProbeData>;
    getFilesRecursive: (dir: string) => Promise<IFileInfo[]>;
}

const fsp: IFsp = {
    stat,
    readdir,
    probe,
    getFilesRecursive,
};

export { fsp };
