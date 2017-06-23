import * as fs from 'fs';
import * as util from 'util';
import ffprobe = require('node-ffprobe');

const stat = util.promisify(fs.stat) as (path: string) => Promise<fs.Stats>;
const readdir = util.promisify(fs.readdir) as (path: string) => Promise<string[]>;

const probe: (track: string) => Promise<any> = (track) => {
    return new Promise((resolve, reject) => {
        ffprobe(track, (err: any, probeData: any) => {
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
