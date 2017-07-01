import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  tagName: 'form',

  email: computed.alias('subscription.email'),
  end: computed.alias('subscription.end'),
  location: computed.alias('subscription.location'),
  start: computed.alias('subscription.start'),
  units: computed.alias('subscription.units'),

  submit(e) {
    this.sendAction('form-submitted', this.get('subscription'));
    e.preventDefault();
    return false;
  }
});
