export const combineRouteSwitchers = (...routeSwitcherFunctions) => {
    return (key) => {
        for (let i = 0; i < routeSwitcherFunctions.length; i++) {
            const component = routeSwitcherFunctions[i](key);
            if (component) {
                return component;
            }
        }
        console.error(`No component found for route ${key}`);
    }
};
