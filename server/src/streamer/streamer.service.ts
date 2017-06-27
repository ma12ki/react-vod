import * as fs from 'fs';
import * as util from 'util';
import { inject, injectable } from 'inversify';

import { storeTokens, IVideoStore } from '../store';

const readFileP = util.promisify(fs.readFile);

export interface IStreamer {
    stream: (id: string) => Promise<any>;
}

@injectable()
export class StreamerService implements IStreamer {
    constructor(
        @inject(storeTokens.videoStore) private store: IVideoStore,
    ) {}

    public stream: (id: string) => Promise<any> = async (id) => {
        const file = await this.store.getOne(id);
        const movie = await readFileP(file.path);
        return movie;
    };

}
