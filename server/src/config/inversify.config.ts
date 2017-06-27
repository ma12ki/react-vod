import { Container } from 'inversify';

import {
    configModule,
    storeModule,
    readerModule,
    streamerModule,
} from './container-modules';

const container = new Container();
container.load(
    configModule,
    storeModule,
    readerModule,
    streamerModule,
);

export { container };
