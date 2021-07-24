import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { localCopy } from 'tracked-toolbox';
import moment from 'moment';

const DATE_FORMAT = 'YYYY-MM-DD';

export default class SubscriptionFormComponent extends Component {
  @localCopy('args.subscription.email') email;
  @localCopy('args.subscription.location') location;
  @localCopy('args.subscription.units') units;

  @tracked _end = null;
  @tracked _start = null;

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
  updateSubscription(event) {
    let form = event.target;
    let units = form.querySelector('select[name=units]').value;
    this.args.subscription.setProperties({
      email: this.email,
      end: this.end ? moment(this.end) : null,
      location: this.location,
      start: this.start ? moment(this.start) : null,
      units,
    });
    this.args.formSubmitted(this.args.subscription);
  }
}
