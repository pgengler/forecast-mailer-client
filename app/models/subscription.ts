import Model, { attr } from '@warp-drive/legacy/model';
import moment from 'moment';

export default class Subscription extends Model {
  @attr('string') declare email: string;
  @attr('moment-date') declare start: moment.Moment | null;
  @attr('moment-date') declare end: moment.Moment | null;
  @attr('string') declare location: string;
  @attr('string') declare units: string;
  @attr('boolean') declare geocoded: boolean;
  @attr('moment-date') declare createdAt: moment.Moment | null;
  @attr('moment-date') declare updatedAt: moment.Moment | null;

  get current(): boolean {
    const start = this.start;
    const end = this.end;
    const now = moment();

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

  get future(): boolean {
    const start = this.start;
    const now = moment();
    if (!start) {
      return false;
    }

    return start.isAfter(now, 'day');
  }

  get past(): boolean {
    const end = this.end;
    const now = moment();
    if (!end) {
      return false;
    }

    return end.isSameOrBefore(now, 'day');
  }
}
