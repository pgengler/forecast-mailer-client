import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
  email: attr('string'),
  end: attr('string'),
  location: attr('string'),
  start: attr('string'),
  units: attr('string')
});
