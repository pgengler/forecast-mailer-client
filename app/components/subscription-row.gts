import Component from '@glimmer/component';
import { LinkTo } from '@ember/routing';
import type Subscription from 'forecast-mailer/models/subscription';

const DATE_FORMAT = 'YYYY-MM-DD';

interface SubscriptionRowSignature {
  Args: {
    subscription: Subscription;
  };
}

export default class SubscriptionRow extends Component<SubscriptionRowSignature> {
  get formattedEnd(): string {
    const date = this.args.subscription.end;
    return date ? date.format(DATE_FORMAT) : '';
  }

  get formattedStart(): string {
    const date =
      this.args.subscription.start || this.args.subscription.createdAt;
    return date ? date.format(DATE_FORMAT) : '';
  }

  <template>
    <tr class="subscription">
      <td>
        {{@subscription.email}}
      </td>
      <td class={{unless @subscription.geocoded "geocoding-failed"}}>
        {{@subscription.location}}
      </td>
      <td class={{unless @subscription.start "indefinite"}}>
        {{this.formattedStart}}
      </td>
      <td>
        {{this.formattedEnd}}
      </td>
      <td>
        {{@subscription.units}}
      </td>
      <td>
        <LinkTo @route="subscriptions.edit" @model={{@subscription}}>
          Edit
        </LinkTo>
      </td>
    </tr>
  </template>
}
