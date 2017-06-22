/**
 * Module dependencies.
 */
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as errorHandler from 'errorhandler';
import * as logger from 'morgan';
import * as dotenv from 'dotenv';
import * as path from 'path';
import expressValidator = require('express-validator');
import { Request, Response } from 'express';

import { getVideoFiles } from './reader/reader.controller';

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
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

/**
 * Primary app routes.
 */
app.get('/ping', (req: Request, res: Response) => res.send('pong xD'));

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

getVideoFiles(['Q:/test'])
  .then((res) => console.log(res))
  .catch((err) => console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', err));

export default app;
