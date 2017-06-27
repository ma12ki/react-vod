import { interfaces, ContainerModule } from 'inversify';
import { interfaces as interfacesExpressUtils, TYPE } from 'inversify-express-utils';

import { readerTypes } from './reader.types';
import { ReaderController } from './reader.controller';
import { ReaderService, IReader } from './reader.service';

const readerModule = new ContainerModule((bind: interfaces.Bind) => {
    bind<IReader>(readerTypes.readerService).to(ReaderService);
    bind<interfacesExpressUtils.Controller>(TYPE.Controller).to(ReaderController).whenTargetNamed('ReaderController');
});

export { readerModule };
