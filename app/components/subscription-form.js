import Component from '@glimmer/component';
import { action } from '@ember/object';
import { oneWay } from '@ember/object/computed';
import moment from 'moment';

const DATE_FORMAT = 'YYYY-MM-DD';

export default class SubscriptionFormComponent extends Component {
  @oneWay('args.subscription.email') email;
  @oneWay('args.subscription.location') location;
  @oneWay('args.subscription.units') units;

  _end = null;
  _start = null;

  get end() {
    if (this._end !== null) {
      return this._end;
    }
    if (this.args.subscription.end) {
      return this.args.subscription.end.format(DATE_FORMAT);
    }
    return '';
  }
  set end(value) {
    this._end = value;
  }

  get start() {
    if (this._start !== null) {
      return this._start;
    }
    if (this.args.subscription.start) {
      return this.args.subscription.start.format(DATE_FORMAT);
    }
    return '';
  }
  set start(value) {
    this._start = value;
  }

  @action
  updateSubscription(e) {
    e.preventDefault();
    this.args.subscription.setProperties({
      email: this.email,
      end: this.end ? moment(this.end) : null,
      location: this.location,
      start: this.start ? moment(this.start) : null,
      units: this.units,
    });
    this.args.formSubmitted(this.args.subscription);
  }
}
