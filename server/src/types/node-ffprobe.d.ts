declare module 'node-ffprobe' {
    function probe(track: string, cb: Function): void;

    export = probe;
}
