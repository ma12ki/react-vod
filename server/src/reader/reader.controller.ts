import * as express from 'express';
import { injectable, inject } from 'inversify';
import { interfaces, Controller, Get, Post, Delete, Response } from 'inversify-express-utils';

import { IVideoFile } from '../store';
import { IReader } from './reader.service';
import { readerTokens } from './reader.tokens';

@Controller('/videos')
@injectable()
export class ReaderController implements interfaces.Controller {

    constructor(
        @inject(readerTokens.readerService) private readerService: IReader,
    ) {}

    @Get('/refresh')
    public async refreshVideoFiles(@Response() res: express.Response): Promise<IVideoFile[]> {
        return this.readerService.refreshVideoFiles();
    }
    @Get('/')
    public async getVideoFiles(req: express.Request, res: express.Response, next: express.NextFunction): Promise<IVideoFile[]> {
        return this.readerService.getVideoFiles();
    }
    @Get('/:id')
    public async getVideoFile(req: express.Request, res: express.Response, next: express.NextFunction): Promise<IVideoFile> {
        const { id } = req.params;
        if (id === undefined) {
            return res.status(400).send() as any;
        }
        const video = await this.readerService.getVideoFile(id);
        if (!video) {
            return res.status(404).send() as any;
        }
        return video;
    }
}