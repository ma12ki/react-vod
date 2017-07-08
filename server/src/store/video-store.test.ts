import { Container } from 'inversify';

import { storeModule } from './store.module';
import { storeTokens } from './store.tokens';
import { IStore } from './store';
import { IVideoStore, IVideoFile } from './video-store';

describe('video store', () => {

    let container: Container;
    let mockStore: IStore;
    let service: IVideoStore;

    beforeEach(() => {
        container = new Container();
        container.load(storeModule);
    });

    beforeEach(() => {
        mockStore = {
            get: jest.fn(async () => undefined),
            set: jest.fn(async () => undefined),
        };

        container.unbind(storeTokens.store);
        container.bind<IStore>(storeTokens.store).toConstantValue(mockStore);
    });

    beforeEach(() => {
        service = container.get<IVideoStore>(storeTokens.videoStore);
    });

    afterEach(() => {
        container = undefined;
    });

    describe('#get()', () => {

        describe('when no files are available', () => {

            beforeEach(() => {
                mockStore.get = async () => undefined;
            });

            it('returns an empty array', async () => {
                const files = await service.get();

                expect(files).toEqual([]);
            });
        });

        describe('when some files are available', () => {

            const storedFiles = [{}, {}];

            beforeEach(() => {
                mockStore.get = async () => storedFiles;
            });

            it('returns stored files', async () => {
                const actual = await service.get();

                expect(actual).toEqual(storedFiles);
            });
        });
    });

    describe('#getOne()', () => {
        describe('when no file matches', () => {

            beforeEach(() => {
                mockStore.get = async () => undefined;
            });

            it('returns null', async () => {
                const file = await service.getOne('123');

                expect(file).toBeFalsy();
            });
        });

        describe('when there is a matching file', () => {

            const storedFile = { id: '123' };
            const storedFiles = [storedFile];

            beforeEach(() => {
                mockStore.get = async () => storedFiles;
            });

            it('returns the matching file', async () => {
                const actual = await service.getOne('123');

                expect(actual).toEqual(storedFile);
            });
        });
    });

    describe('#set()', () => {
        describe('when files already exist', () => {

            const storedFiles = [
                { id: '1', path: 'a', size: 1 },
                { id: '2', path: 'b', size: 2 },
            ];

            beforeEach(() => {
                mockStore.get = async () => storedFiles;
            });

            it('returns stored files', async () => {
                const files = await service.set(storedFiles as IVideoFile[]);

                expect(files).toEqual(storedFiles);
            });

            it('merges new files with stored files', async () => {
                const newFiles = [
                    ...storedFiles,
                    { }
                ];
                const files = await service.set(newFiles as IVideoFile[]);

                expect(files.length).toEqual(storedFiles.length + 1);
                expect(files[files.length - 1].id).toBeTruthy();
            });
        });

        describe('when there are no files in the store', () => {

            beforeEach(() => {
                mockStore.get = async () => undefined;
            });

            it('returns new files with generated IDs', async () => {
                const newFiles = [{}, {}];
                const files = await service.set(newFiles as IVideoFile[]);

                expect(files.length).toEqual(newFiles.length);
                files.forEach((file) => {
                    expect(file.id).toBeTruthy();
                });
            });
        });
    });

});
