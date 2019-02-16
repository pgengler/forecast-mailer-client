import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  email: faker.internet.email,
  location: () => `${faker.address.city()}, ${faker.address.stateAbbr()}`,
  start: () => faker.date.recent(),
  end: () => faker.date.future()
});
