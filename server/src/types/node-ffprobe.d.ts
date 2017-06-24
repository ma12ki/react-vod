declare module 'node-ffprobe' {
    interface IStream {
        width: number;
        height: number;
    }
    interface IFormat {
        start_time: number;
        duration: number;
        size: number;
    }
    interface IMetadata {
        title: string;
    }
    interface IProbeData {
        filename: string;
        filepath: string;
        fileext: string;
        file: string;
        streams: IStream[];
        format: IFormat;
        metadata: IMetadata;
    }
    interface IProbeCb {
        (err: any, probeData: IProbeData): void;
    }

    function probe(track: string, cb: IProbeCb): void;

    export = probe;
}
