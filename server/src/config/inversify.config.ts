import { Container } from 'inversify';

import {
    configModule,
    utilsModule,
    storeModule,
    readerModule,
    streamerModule,
} from './container-modules';

const container = new Container();
container.load(
    configModule,
    utilsModule,
    storeModule,
    readerModule,
    streamerModule,
);

export { container };
