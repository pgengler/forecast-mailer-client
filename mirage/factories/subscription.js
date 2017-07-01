import { Factory, faker } from 'ember-cli-mirage';

function zeroPad(value) {
  if (value < 10) {
    return `0${value}`;
  }
  return `${value}`;
}

function formatDate(dateString) {
  let date = new Date(dateString);
  return `${date.getFullYear()}-${zeroPad(date.getMonth())}-${zeroPad(date.getDate())}`;
}

export default Factory.extend({
  email: faker.internet.email,
  location: () => `${faker.address.city()}, ${faker.address.stateAbbr()}`,
  start: () => formatDate(faker.date.recent()),
  end: () => formatDate(faker.date.future())
});
