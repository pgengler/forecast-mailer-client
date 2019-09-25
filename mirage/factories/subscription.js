import { Factory, trait } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  email: faker.internet.email,
  location: () => `${faker.address.city()}, ${faker.address.stateAbbr()}`,
  start: () => faker.date.recent(),
  end: () => faker.date.future(),
  units: () => faker.random.arrayElement(['si', 'us', 'auto']),

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
  })
});
