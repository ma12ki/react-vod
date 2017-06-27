import { ContainerModule, interfaces } from 'inversify';

import { configTokens } from './config.tokens';

const configModule = new ContainerModule((bind: interfaces.Bind) => {
    bind<string[]>(configTokens.videoFileDirs).toConstantValue([
        'Q:/test'
    ]);
});

export { configModule };
