import * as fs from 'fs';
import * as util from 'util';

const stat = util.promisify(fs.stat) as (path: string) => Promise<fs.Stats>;
const readdir = util.promisify(fs.readdir) as (path: string) => Promise<string[]>;

export {
    stat,
    readdir,
};
