import { ContainerModule, interfaces } from 'inversify';

import { utilsTokens } from './utils.tokens';
import { fsp, IFsp } from './fs-promisified';

const utilsModule = new ContainerModule((bind: interfaces.Bind) => {
    bind<IFsp>(utilsTokens.fsp).toConstantValue(fsp);
});

export { utilsModule };
