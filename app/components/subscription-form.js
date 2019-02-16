import Component from '@ember/component';
import { computed } from '@ember/object';
import { oneWay } from '@ember/object/computed';
import { isEmpty } from '@ember/utils';
import moment from 'moment';

const DATE_FORMAT = 'YYYY-MM-DD';

export default Component.extend({
  tagName: 'form',

  'form-submitted': (/* subscription */) => { /* noop */ },

  email: oneWay('subscription.email'),
  location: oneWay('subscription.location'),
  units: oneWay('subscription.units'),

  end: computed('subscription.end', function() {
    let date = this.get('subscription.end');
    return date ? date.format(DATE_FORMAT) : '';
  }),
  start: computed('subscription.start', function() {
    let date = this.get('subscription.start');
    return date ? date.format(DATE_FORMAT) : '';
  }),

  submit(e) {
    e.preventDefault();
    this.get('subscription').setProperties({
      email: this.email,
      end: isEmpty(this.end) ? null : moment(this.end),
      location: this.location,
      start: isEmpty(this.start) ? null : moment(this.start),
      units: this.units,
    });
    this.get('form-submitted')(this.get('subscription'));
    return false;
  }
});
