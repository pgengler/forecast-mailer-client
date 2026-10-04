import { Factory, trait } from 'miragejs';
import { faker } from '@faker-js/faker';

export default Factory.extend({
  email: () => faker.internet.email(),
  location: () => `${faker.location.city()}, ${faker.location.state({ abbreviated: true })}`,
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
});
