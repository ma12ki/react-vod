export const routeFinder = (...switcherFuncs) => {
    return (key) => {
        for (let i = 0; i < switcherFuncs.length; i++) {
            const component = switcherFuncs[i](key);
            if (component) {
                return component;
            }
        }
        console.error(`No component found for route ${key}`);
    }
};
