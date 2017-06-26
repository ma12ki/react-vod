export interface IMemory {
    [key: string]: any;
}

export interface IStore {
    get: (key: string) => Promise<any>;
    set: (key: string, value: any) => Promise<void>;
}

const memory: IMemory = {};

const store: IStore = {
    async get(key: string) {
        return memory[key];
    },

    async set(key: string, value: any) {
        memory[key] = value;
    }
};

export { store };
