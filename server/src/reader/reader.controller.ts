import * as express from 'express';
import { injectable, inject } from 'inversify';
import { interfaces, Controller, Get, Post, Delete, Response } from 'inversify-express-utils';

import { IVideoFile } from '../store';
import { IReader } from './reader.service';
import { readerTypes } from './reader.types';

@Controller('/videos')
@injectable()
export class ReaderController implements interfaces.Controller {

    constructor(
        @inject(readerTypes.readerService) private readerService: IReader,
    ) {}

    @Get('/')
    public getVideoFiles(req: express.Request, res: express.Response, next: express.NextFunction): Promise<IVideoFile[]> {
        return this.readerService.getVideoFiles();
    }

    @Get('/refresh')
    public async refreshVideoFiles(@Response() res: express.Response): Promise<IVideoFile[]> {
        return this.readerService.refreshVideoFiles();
    }
}