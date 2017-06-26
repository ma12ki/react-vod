import { container } from '../config/inversify.config';

const bindDependencies = (func: Function, dependencies: any[]) => {
    const injections = dependencies.map((dependency) => {console.error(container);
        return container.get(dependency);
    });
    return func.bind(func, ...injections);
};

export { bindDependencies };
