import { Container } from 'inversify';
import { InversifyExpressServer, TYPE } from 'inversify-express-utils';
import { agent } from 'supertest';

import { readerTokens } from './reader.tokens';
import { readerModule } from './reader.module';
import { IReader } from './reader.service';
import { ReaderController } from './reader.controller';

describe('reader controller', () => {

    let container: Container;
    let mockReaderService: IReader;
    let app;

    beforeEach(() => {
        container = new Container();
    });

    beforeEach(() => {
        mockReaderService = {
            getVideoFile: jest.fn(async () => undefined),
            getVideoFiles: jest.fn(async () => undefined),
            refreshVideoFiles: jest.fn(async () => undefined),
        };

        container.bind(readerTokens.readerService).toConstantValue(mockReaderService);
        container.bind(TYPE.Controller).to(ReaderController);
    });

    beforeEach(() => {
        const server = new InversifyExpressServer(container);
        app = server.build();
    });

    afterEach(() => {
        container = undefined;
    });

    describe('/videos/refresh', () => {

        it('returns an array of files', async () => {
            const files = [{}];
            mockReaderService.refreshVideoFiles = jest.fn(async () => files);

            return agent(app).get('/videos/refresh')
                .expect(200)
                .then((res) => {
                    expect(res.body).toEqual(files);
                });
        });

    });

    describe('/videos', () => {

        it('returns an array of files', async () => {
            const files = [{}, {}];
            mockReaderService.getVideoFiles = jest.fn(async () => files);

            return agent(app).get('/videos')
                .expect(200)
                .then((res) => {
                    expect(res.body).toEqual(files);
                });
        });

    });

    describe('/videos/:id', () => {

        it('returns a file if ID matches', async () => {
            const file = {};
            mockReaderService.getVideoFile = jest.fn(async () => file);
            const id = '123';

            return agent(app).get(`/videos/${id}`)
                .expect(200)
                .then((res) => {
                    expect(mockReaderService.getVideoFile).toHaveBeenCalledWith(id);
                    expect(res.body).toEqual(file);
                });
        });

    });

    describe('/videos/:id', () => {

        it('returns 404 if no file matches', async () => {
            mockReaderService.getVideoFile = jest.fn(async () => undefined);

            return agent(app).get(`/videos/nonexistent`)
                .expect(404)
                .then((res) => {
                    expect(res.body).toEqual({});
                });
        });

    });

});
