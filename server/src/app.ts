/**
 * Module dependencies.
 */
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as errorHandler from 'errorhandler';
import * as logger from 'morgan';
import * as cors from 'cors';
import expressValidator = require('express-validator');
import { Request, Response } from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';

import { container } from './config';

/**
 * Create Express server.
 */
const server = new InversifyExpressServer(container);

/**
 * Express configuration.
 */
server.setConfig((app) => {
    app.set('port', process.env.PORT || 3001);
    app.use(logger('dev'));
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(expressValidator());
});

/**
 * Error Handler. Provides full stack - remove for production
 */
if (process.env.NODE_ENV !== 'production') {
    server.setErrorConfig((app) => {
        app.use(errorHandler());
    });
}

/**
 * Build the server.
 */
const app = server.build();

export { app };
