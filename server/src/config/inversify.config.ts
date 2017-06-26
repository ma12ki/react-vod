import { Container } from 'inversify';

import { storeModule } from './container-modules';

const container = new Container();
container.load(storeModule);

export { container };
