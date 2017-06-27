import { ContainerModule, interfaces } from 'inversify';

import { storeTokens } from './store.tokens';
import { store, IStore } from './store';
import { VideoStore, IVideoStore } from './video-store';

const storeModule = new ContainerModule((bind: interfaces.Bind) => {
    bind<IStore>(storeTokens.store).toConstantValue(store);
    bind<IVideoStore>(storeTokens.videoStore).to(VideoStore);
});

export { storeModule };
