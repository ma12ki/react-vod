import { Container } from 'inversify';

import {
    configModule,
    storeModule,
    readerModule,
} from './container-modules';

const container = new Container();
container.load(
    configModule,
    storeModule,
    readerModule,
);

export { container };
