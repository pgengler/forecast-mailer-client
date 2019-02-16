import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
  email: attr('string'),
  end: attr('moment-date'),
  location: attr('string'),
  start: attr('moment-date'),
  units: attr('string')
});
