import 'reflect-metadata';

import { app } from './app';
import { container } from './config';
import { readerTokens, IReader } from './reader';

app.listen(app.get('port'), '0.0.0.0', () => {
  console.log(('  App is running at http://localhost:%d in %s mode'), app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});

const reader: IReader = container.get<IReader>(readerTokens.readerService);

reader.refreshVideoFiles()
  .then(() => console.log('--------- refreshed video files'))
  .catch((err) => console.log('---------- failed to refresh video files', err));

export default app;
