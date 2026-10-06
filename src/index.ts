import 'dotenv/config';
import { serve } from '@hono/node-server';
import chalk from 'chalk';
import pino from 'pino';
import { buildRoutes } from './routes.js';

const logger = pino({ level: process.env.LOG_LEVEL ?? 'info' });
// Prefer env overrides; fall back to all-interfaces on port 3000.
const port = Number(process.env.PORT ?? 3000);
const host = process.env.HOST ?? '0.0.0.0';
const app = buildRoutes();

serve({ fetch: app.fetch, port, hostname: host }, (info) => {
  logger.info({ host, port: info.port }, 'sample-web-app listening');
  console.log(chalk.green(`sample-web-app ready on :${info.port}`));
});
