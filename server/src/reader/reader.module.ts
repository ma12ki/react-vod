import { interfaces, ContainerModule } from 'inversify';
import { interfaces as interfacesExpressUtils, TYPE } from 'inversify-express-utils';

import { readerTokens } from './reader.tokens';
import { ReaderController } from './reader.controller';
import { ReaderService, IReader } from './reader.service';

const readerModule = new ContainerModule((bind: interfaces.Bind) => {
    bind<IReader>(readerTokens.readerService).to(ReaderService);
    bind<interfacesExpressUtils.Controller>(TYPE.Controller).to(ReaderController).whenTargetNamed('ReaderController');
});

export { readerModule };
