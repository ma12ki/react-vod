import * as fs from 'fs';
import * as util from 'util';

import { retrieveOne, IVideoFile } from '../store/video-file-store';

const readFileP = util.promisify(fs.readFile);

const stream = async (id: string) => {
    const file = retrieveOne(id);
    const movie = await readFileP(file.path);
    return movie;
};

export {
    stream,
};
