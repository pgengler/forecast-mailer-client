import { createServer, Model, JSONAPISerializer, Factory } from 'miragejs';
import { faker } from '@faker-js/faker';

// miragejs exports `trait` at runtime but not in its type definitions.
function trait<T extends Record<string, unknown>>(extension: T): T {
  return { extension, __isTrait__: true } as unknown as T;
}

export function makeServer(config: Record<string, unknown> = {}) {
  return createServer({
    ...config,
    models: {
      subscription: Model,
    },
    serializers: {
      application: JSONAPISerializer,
    },
    factories: {
      subscription: Factory.extend({
        email: () => faker.internet.email(),
        location: () =>
          `${faker.location.city()}, ${faker.location.state({ abbreviated: true })}`,
        start: () => faker.date.recent(),
        end: () => faker.date.future(),
        units: () => faker.helpers.arrayElement(['si', 'us', 'auto']),
        geocoded: true,
        createdAt: () => faker.date.past(),
        updatedAt: () => faker.date.past(),

        current: trait({
          start: () => faker.date.recent(),
          end: () => faker.date.future(),
        }),

        future: trait({
          start: () => faker.date.future(),
          end: () => faker.date.future(),
        }),

        past: trait({
          end: () => faker.date.recent(),
          start: () => faker.date.past(),
        }),
      }),
    },
    routes() {
      this.namespace = '/api';
      this.resource('subscription');
    },
  });
}
