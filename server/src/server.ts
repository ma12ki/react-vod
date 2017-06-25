/**
 * Module dependencies.
 */
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as errorHandler from 'errorhandler';
import * as logger from 'morgan';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as path from 'path';
import expressValidator = require('express-validator');
import { Request, Response } from 'express';

import { getVideoFiles, refreshVideoFiles } from './reader/reader.controller';

/**
 * Controllers (route handlers).
 */

/**
 * Create Express server.
 */
const app = express();

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3001);
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

/**
 * Primary app routes.
 */
app.get('/ping', (req: Request, res: Response) => res.send('pong xD'));
app.get('/refresh-videos', async (req: Request, res: Response) => {
  const videos = await refreshVideoFiles(['Q:/test']);
  return res.send(videos);
});
app.get('/videos', async (req: Request, res: Response) => {
  const videos = await getVideoFiles();
  return res.send(videos);
});

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log(('  App is running at http://localhost:%d in %s mode'), app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});

refreshVideoFiles(['Q:/test'])
  .then(() => console.log('--------- refreshed video files'))
  .catch((err) => console.log('---------- failed to refresh video files', err));

export default app;
