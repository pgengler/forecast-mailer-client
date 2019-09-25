import Model, { attr } from '@ember-data/model';
import moment from 'moment';

export default class Subscription extends Model {
  @attr('string') email;
  @attr('moment-date') end;
  @attr('string') location;
  @attr('moment-date') start;
  @attr('string') units;

  @attr('moment-date') createdAt;
  @attr('moment-date') updatedAt;

  get current() {
    let start = this.start;
    let end = this.end;
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
  }

  get future() {
    let start = this.start;
    let now = moment();
    if (!start) {
      return false;
    }

    return start.isAfter(now, 'day');
  }

  get past() {
    let end = this.end;
    let now = moment();
    if (!end) {
      return false;
    }

    return end.isSameOrBefore(now, 'day');
  }
}
