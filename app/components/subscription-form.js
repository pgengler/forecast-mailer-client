import Component from '@ember/component';
import { alias } from '@ember/object/computed';

export default Component.extend({
  tagName: 'form',

  'form-submitted': (/* subscription */) => { /* noop */ },

  email: alias('subscription.email'),
  end: alias('subscription.end'),
  location: alias('subscription.location'),
  start: alias('subscription.start'),
  units: alias('subscription.units'),

  submit(e) {
    e.preventDefault();
    this.get('form-submitted')(this.get('subscription'));
    return false;
  }
});
