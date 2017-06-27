import { interfaces, ContainerModule } from 'inversify';
import { interfaces as interfacesExpressUtils, TYPE } from 'inversify-express-utils';

import { streamerTokens } from './streamer.tokens';
import { StreamerController } from './streamer.controller';
import { StreamerService, IStreamer } from './streamer.service';

const streamerModule = new ContainerModule((bind: interfaces.Bind) => {
    bind<IStreamer>(streamerTokens.streamerService).to(StreamerService);
    bind<interfacesExpressUtils.Controller>(TYPE.Controller).to(StreamerController).whenTargetNamed('StreamerController');
});

export { streamerModule };
