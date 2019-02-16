import Component from '@ember/component';
import { computed } from '@ember/object';

const DATE_FORMAT = 'YYYY-MM-DD';

export default Component.extend({
  tagName: '',

  formattedEnd: computed('subscription.end', function() {
    let date = this.get('subscription.end');
    return date ? date.format(DATE_FORMAT) : '';
  }),

  formattedStart: computed('subscription.start', function() {
    let date = this.get('subscription.start');
    return date ? date.format(DATE_FORMAT) : '';
  })
});
