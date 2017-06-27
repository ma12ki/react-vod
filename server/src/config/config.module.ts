import { ContainerModule, interfaces } from 'inversify';

import { configTypes } from './config.types';

const configModule = new ContainerModule((bind: interfaces.Bind) => {
    bind<string[]>(configTypes.videoFileDirs).toConstantValue([
        'Q:/test'
    ]);
});

export { configModule };
