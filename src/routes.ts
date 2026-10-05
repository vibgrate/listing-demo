import { Hono } from 'hono';
import { formatISO } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import ms from 'ms';
import { echoSchema, healthSchema, itemSchema, type Item } from './schemas.js';

const startedAt = Date.now();
const items = new Map<string, Item>();

export function buildRoutes() {
  const app = new Hono();

  app.get('/health', (c) => {
    const body = healthSchema.parse({
      status: 'ok',
      uptimeMs: Date.now() - startedAt,
      now: formatISO(new Date()),
    });
    return c.json(body);
  });

  app.post('/echo', async (c) => {
    const raw = await c.req.json().catch(() => null);
    const parsed = echoSchema.safeParse(raw);
    if (!parsed.success) {
      return c.json({ error: 'Invalid body', details: parsed.error.flatten() }, 400);
    }
    return c.json({
      echo: parsed.data.message,
      receivedAt: formatISO(new Date()),
      ttlHint: ms(5 * 60 * 1000),
    });
  });

  app.post('/items', async (c) => {
    const raw = await c.req.json().catch(() => null);
    const name = typeof raw === 'object' && raw && 'name' in raw ? String((raw as { name: unknown }).name) : '';
    const item = itemSchema.parse({
      id: uuidv4(),
      name,
      createdAt: formatISO(new Date()),
    });
    items.set(item.id, item);
    return c.json(item, 201);
  });

  app.get('/items/:id', (c) => {
    const item = items.get(c.req.param('id'));
    if (!item) {
      return c.json({ error: 'Not found' }, 404);
    }
    return c.json(item);
  });

  return app;
}
