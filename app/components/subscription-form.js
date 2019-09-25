import Component from '@glimmer/component';
import { action } from '@ember/object';
import { oneWay } from '@ember/object/computed';
import moment from 'moment';

const DATE_FORMAT = 'YYYY-MM-DD';

export default class SubscriptionFormComponent extends Component {
  @oneWay('args.subscription.email') email;
  @oneWay('args.subscription.end') _end;
  @oneWay('args.subscription.location') location;
  @oneWay('args.subscription.start') _start;
  @oneWay('args.subscription.units') units;

  get end() {
    return this._end ? this._end.format(DATE_FORMAT) : '';
  }
  set end(value) {
    this._end = value ? moment(value) : null;
  }

  get start() {
    return this._start ? this._start.format(DATE_FORMAT) : '';
  }
  set start(value) {
    this._start = value ? moment(value) : null;
  }

  @action
  updateSubscription(e) {
    e.preventDefault();
    this.args.subscription.setProperties({
      email: this.email,
      end: this.end,
      location: this.location,
      start: this.start,
      units: this.units,
    });
    this.args.formSubmitted(this.args.subscription);
  }
}
