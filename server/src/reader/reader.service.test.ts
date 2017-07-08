import { Container } from 'inversify';

import { configModule, configTokens } from '../config';
import { utilsModule, utilsTokens, IFsp } from '../utils';
import { storeModule, storeTokens, IVideoStore } from '../store';
import { readerTokens } from './reader.tokens';
import { readerModule } from './reader.module';
import { IReader } from './reader.service';

describe('reader service', () => {

    let container: Container;
    let mockStore: IVideoStore;
    let mockDirs: string[];
    let mockFsp: IFsp;
    let service: IReader;

    beforeEach(() => {
        container = new Container();
        container.load(configModule, utilsModule, storeModule, readerModule);
    });

    beforeEach(() => {
        mockDirs = ['/mock/dir'];
        mockFsp = {
            getFilesRecursive: async () => [],
            probe: async () => ({ metadata: {}, format: {} })
        } as any;
        mockStore = {
            get: jest.fn(async () => undefined),
            getOne: jest.fn(async () => undefined),
            set: jest.fn(async (data) => data),
        };

        container.unbind(configTokens.videoFileDirs);
        container.bind<string[]>(configTokens.videoFileDirs).toConstantValue(mockDirs);
        container.unbind(utilsTokens.fsp);
        container.bind<IFsp>(utilsTokens.fsp).toConstantValue(mockFsp);
        container.unbind(storeTokens.videoStore);
        container.bind<IVideoStore>(storeTokens.videoStore).toConstantValue(mockStore);
    });

    beforeEach(() => {
        service = container.get<IReader>(readerTokens.readerService);
    });

    afterEach(() => {
        container = undefined;
    });

    describe('#getVideoFiles()', () => {

        it('returns files from the store', async () => {
            const files = [];
            mockStore.get = async () => files;

            const actual = await service.getVideoFiles();

            expect(actual).toEqual(files);
        });

    });

    describe('#getVideoFile()', () => {

        it('returns file from the store when it exists', async () => {
            const file = {};
            mockStore.getOne = jest.fn(async () => file);
            const id = '123';

            const actual = await service.getVideoFile(id);

            expect(mockStore.getOne).toHaveBeenCalledWith(id);
            expect(actual).toEqual(file);
        });

        it('returns null from the store when file does not exist', async () => {
            mockStore.getOne = jest.fn(async () => undefined);
            const id = '123';

            const actual = await service.getVideoFile(id);

            expect(mockStore.getOne).toHaveBeenCalledWith(id);
            expect(actual).toBeFalsy();
        });

    });

    describe('#refreshVideoFiles()', () => {

        beforeEach(() => {
            if (!mockDirs.length) {
                mockDirs.push('some/dir');
            }
        });

        it('returns a list of video files', async () => {
            const files = [
                { path: '/lol.txt' },
                { path: '/xD/omg.mp4' },
                { path: '/rofl/bbq.webm' },
            ];
            mockFsp.getFilesRecursive = jest.fn(async () => files);

            const actual = await service.refreshVideoFiles();

            expect(mockFsp.getFilesRecursive).toHaveBeenCalled();
            expect(actual.length).toEqual(2);
        });

    });

});
