import Component from '@glimmer/component';
import SubscriptionRow from 'forecast-mailer/components/subscription-row';
import type Subscription from 'forecast-mailer/models/subscription';

interface SubscriptionTableSignature {
  Args: {
    subscriptions: Subscription[];
  };
  Blocks: {
    default: [];
  };
  Element: HTMLTableElement;
}

export default class SubscriptionTable extends Component<SubscriptionTableSignature> {
  get subscriptions(): Subscription[] {
    return this.args.subscriptions;
  }

  <template>
    <table ...attributes>
      <thead>
        <tr>
          <th>Sent to</th>
          <th>Location</th>
          <th>Start</th>
          <th>End</th>
          <th>Units</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {{#each this.subscriptions as |subscription|}}
          <SubscriptionRow @subscription={{subscription}} />
        {{/each}}
      </tbody>
    </table>
  </template>
}
