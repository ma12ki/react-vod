let memory = {};

const store = (key: string, value: any) => {
    memory = {
        ...memory,
        [key]: value,
    };
};

const retrieve = (key: string) => {
    return memory[key];
};

export {
    store,
    retrieve,
};
