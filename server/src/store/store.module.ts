import { ContainerModule, interfaces } from 'inversify';

import { storeTypes } from './store.types';
import { store, IStore } from './store';
import { VideoStore, IVideoStore } from './video-store';

const storeModule = new ContainerModule((bind: interfaces.Bind) => {
    bind<IStore>(storeTypes.store).toConstantValue(store);
    bind<IVideoStore>(storeTypes.videoStore).to(VideoStore);
});

export { storeModule };
