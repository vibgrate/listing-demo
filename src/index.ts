import 'dotenv/config';
import { serve } from '@hono/node-server';
import chalk from 'chalk';
import pino from 'pino';
import { buildRoutes } from './routes.js';

const logger = pino({ level: process.env.LOG_LEVEL ?? 'info' });
const port = Number(process.env.PORT ?? 3000);
const app = buildRoutes();

serve({ fetch: app.fetch, port }, (info) => {
  logger.info({ port: info.port }, 'sample-web-app listening');
  console.log(chalk.green(`sample-web-app ready on :${info.port}`));
});
