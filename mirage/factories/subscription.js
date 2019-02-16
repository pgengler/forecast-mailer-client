import { Factory, faker, trait } from 'ember-cli-mirage';

export default Factory.extend({
  email: faker.internet.email,
  location: () => `${faker.address.city()}, ${faker.address.stateAbbr()}`,
  start: () => faker.date.recent(),
  end: () => faker.date.future(),

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
