import { ContainerModule, interfaces } from 'inversify';

import { configTokens } from './config.tokens';
import { config } from './config';

const configModule = new ContainerModule((bind: interfaces.Bind) => {
    bind<string[]>(configTokens.videoFileDirs).toConstantValue(config.dirs);
});

export { configModule };
