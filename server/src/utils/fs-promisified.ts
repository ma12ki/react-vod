import * as fs from 'fs';
import * as util from 'util';
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
interface IProbeData {
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

export {
    stat,
    readdir,
    probe,
};
