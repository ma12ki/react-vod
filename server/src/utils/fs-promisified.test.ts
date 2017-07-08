import { fsp } from './fs-promisified';

jest.mock('fs', () => {
    return {
        stat: (path, fn) => fn(undefined, {
            isDirectory: () => false
        }),
        readdir: (path, fn) => fn(undefined, [])
    };
});

jest.mock('util', () => {
    return {
        promisify: (fn) => {
            return (arg) => {
                return new Promise((resolve, reject) => {
                    fn(arg, (err, res) => {
                        return err ? reject(err) : resolve(res);
                    });
                });
            };
        }
    };
});

jest.mock('node-ffprobe', () => {
    return (track, cb) => cb(undefined, {});
});

describe('fs-promisified', () => {

    describe('#stat()', () => {
        it('returns file stats', async () => {
            const stats = await fsp.stat('lol');

            expect(stats).toEqual(jasmine.objectContaining({}));
        });
    });

    describe('#readdir()', () => {
        it('returns files in dir', async () => {
            const files = await fsp.readdir('lol');

            expect(files).toEqual([]);
        });
    });

    describe('#probe()', () => {
        it('returns video metadata', async () => {
            const probeData = await fsp.probe('lol');

            expect(probeData).toEqual({});
        });
    });

    describe('#getFilesRecursive()', () => {
        it('returns a list of files', async () => {
            const files = await fsp.getFilesRecursive('lol');

            expect(files).toBeInstanceOf(Array);
        });
    });

});
