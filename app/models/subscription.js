import DS from 'ember-data';
import { computed } from '@ember/object';
import moment from 'moment';

const { attr } = DS;

export default DS.Model.extend({
  email: attr('string'),
  end: attr('moment-date'),
  location: attr('string'),
  start: attr('moment-date'),
  units: attr('string'),

  current: computed('start', 'end', function() {
    let start = this.get('start');
    let end = this.get('end');
    let now = moment();

    if (!start) {
      if (!end) {
        return true;
      }

      if (end.isSameOrBefore(now, 'day')) {
        return false;
      }

      return true;
    }

    if (start.isSameOrBefore(now, 'day')) {
      if (!end) {
        return true;
      }
      if (end.isSameOrBefore(now, 'day')) {
        return false;
      }
      return true;
    }

    return false;
  }),

  future: computed('start', function() {
    let start = this.get('start');
    let now = moment();
    if (!start) {
      return false;
    }

    return start.isAfter(now, 'day');
  }),

  past: computed('end', function() {
    let end = this.get('end');
    let now = moment();
    if (!end) {
      return false;
    }

    return end.isSameOrBefore(now, 'day');
  })
});
