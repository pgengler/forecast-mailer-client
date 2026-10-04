import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { localCopy } from 'tracked-toolbox';
import { on } from '@ember/modifier';
import { Input } from '@ember/component';
import { eq, preventDefault } from 'forecast-mailer/helpers';
import moment from 'moment';
import type Subscription from 'forecast-mailer/models/subscription';

const DATE_FORMAT = 'YYYY-MM-DD';

interface SubscriptionFormSignature {
  Args: {
    subscription: Subscription;
    formSubmitted: (subscription: Subscription) => void;
  };
  Blocks: {
    'secondary-action'?: [];
  };
}

export default class SubscriptionForm extends Component<SubscriptionFormSignature> {
  @localCopy('args.subscription.email') email!: string;
  @localCopy('args.subscription.location') location!: string;
  @localCopy('args.subscription.units') units!: string;

  @tracked _end: string | null = null;
  @tracked _start: string | null = null;

  get end(): string {
    if (this._end !== null) {
      return this._end;
    }
    if (this.args.subscription.end) {
      return this.args.subscription.end.format(DATE_FORMAT);
    }
    return '';
  }

  set end(value: string) {
    this._end = value;
  }

  get start(): string {
    if (this._start !== null) {
      return this._start;
    }
    if (this.args.subscription.start) {
      return this.args.subscription.start.format(DATE_FORMAT);
    }
    return '';
  }

  set start(value: string) {
    this._start = value;
  }

  @action
  updateSubscription(event: Event): void {
    const form = event.target as HTMLFormElement;
    const units = (form.querySelector('select[name=units]') as HTMLSelectElement).value;
    this.args.subscription.setProperties({
      email: this.email,
      end: this.end ? moment(this.end) : null,
      location: this.location,
      start: this.start ? moment(this.start) : null,
      units,
    });
    this.args.formSubmitted(this.args.subscription);
  }

  <template>
    <form {{on "submit" (preventDefault this.updateSubscription)}}>
      <div class="grid-x">
        <div class="cell">
          <label>
            Location to send the forecast for:
            <Input @type="text" @value={{this.location}} name="location" id="location" />
          </label>
        </div>
      </div>

      <div class="grid-x">
        <div class="cell">
          <label>
            Email to receive forecast:
            <Input @type="text" @value={{this.email}} name="email" id="email" />
          </label>
        </div>
      </div>

      <div class="grid-x">
        <div class="cell">
          <label>
            Units:
            <select name="units">
              <option value="auto">Automatic</option>
              <option value="si" selected={{eq this.units "si"}}>SI</option>
              <option value="us" selected={{eq this.units "us"}}>US</option>
            </select>
          </label>
        </div>
      </div>

      <div class="grid-x grid-margin-x">
        <div class="large-6 cell">
          <label>
            (Optional) Date to start receiving emailed forecasts:
            <Input @type="text" @value={{this.start}} name="start-date" id="start-date" />
          </label>
        </div>
        <div class="large-6 cell">
          <label>
            (Optional) Date to stop receiving emailed forecasts:
            <Input @type="text" @value={{this.end}} name="end-date" id="end-date" />
          </label>
        </div>
      </div>

      <div class="grid-x">
        <div class="cell">
          <button type="submit" class="button">Save</button>
          {{yield to="secondary-action"}}
        </div>
      </div>
    </form>
  </template>
}
