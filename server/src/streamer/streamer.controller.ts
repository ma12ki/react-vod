import * as express from 'express';
import { injectable, inject } from 'inversify';
import { interfaces, Controller, Get, Post, Delete, Response } from 'inversify-express-utils';

import { IVideoFile } from '../store';
import { IStreamer } from './streamer.service';
import { streamerTokens } from './streamer.tokens';

@Controller('/play')
@injectable()
export class StreamerController implements interfaces.Controller {

    constructor(
        @inject(streamerTokens.streamerService) private streamerService: IStreamer,
    ) {}

    @Get('/:id')
    public async stream(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> {
        const { id } = req.params;
        return this.streamerService.stream(id);
    }
}
