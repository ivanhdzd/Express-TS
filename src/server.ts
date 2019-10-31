import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import { existsSync } from 'fs';
import helmet from 'helmet';
import morgan from 'morgan';
import { join } from 'path';

/** Import global configuration */
import './config';

/** Import routes version 1 */
import routesV1 from './api/v1/routes';

/** Create an express instance */
const app: Express = express();
/** Use body parser so we can get into from POST and/or URL parameters */
app.use(json());
/** Permit to server receives only JSON requests */
app.use(urlencoded({ extended: false }));
/** Add cors */
app.use(cors());
/** Help secure Express apps by setting various HTTP headers */
app.use(helmet());
/** Show logs in console in development environment */
app.use(morgan('dev'));
/** Set favicon.ico route */
app.get('/favicon.ico', (req: Request, res: Response) => res.sendFile(join(__dirname, '..', 'favicon.ico')));
/** Add Rest API v1 routes to server */
app.use('/api/v1', routesV1);
/** Client directory */
const clientDirectory: string = 'public';
/** Client directory path */
const clientDirectoryPath: string = join(__dirname, clientDirectory);
/** Validate that public directory exists */
if (existsSync(clientDirectoryPath)) {
	/** Set public directory as static server content */
	app.use(express.static(clientDirectoryPath));
	/** Assuming that frontend is a SPA (Angular, React, VueJS, etc.), redirect all GET requests to it */
	app.get('*', (req: Request, res: Response) => res.sendFile(join(clientDirectoryPath, 'index.html')));
} else console.warn(`[WARNING]: '${ clientDirectory }' directory doesn't exist, only API is available.`);
/** Whatever request method returns a 404 status */
app.use('*', (req: Request, res: Response) => res.sendStatus(404));
/** Server port */
const port: number = +(process.env.PORT || 3000);
/** Start server */
app.listen(port, () => console.info(`\nExpress server running: http://127.0.0.1:${ port }\n`));