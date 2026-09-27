import Component from '@glimmer/component';
import { LinkTo } from '@ember/routing';
import FlashMessages from 'forecast-mailer/components/flash-messages';
import SubscriptionTable from 'forecast-mailer/components/subscription-table';
import type { SubscriptionsIndexRouteModel } from 'forecast-mailer/routes/subscriptions/index';

interface SubscriptionsIndexSignature {
  Args: {
    model: SubscriptionsIndexRouteModel;
  };
}

export default class SubscriptionsIndex extends Component<SubscriptionsIndexSignature> {
  get currentSubscriptions(): SubscriptionsIndexRouteModel {
    return this.args.model.filter((s) => s.current);
  }

  get futureSubscriptions(): SubscriptionsIndexRouteModel {
    return this.args.model.filter((s) => s.future);
  }

  get pastSubscriptions(): SubscriptionsIndexRouteModel {
    return this.args.model.filter((s) => s.past);
  }

  <template>
    <div class="grid-x">
      <div class="cell">
        <h1>Subscriptions</h1>
      </div>
    </div>

    <FlashMessages />

    <div class="grid-x">
      <div class="cell">
        <SubscriptionTable
          @subscriptions={{this.currentSubscriptions}}
          data-test-subscriptions-type="current"
        />
      </div>
    </div>

    <div class="grid-x">
      <div class="cell">
        <LinkTo @route="subscriptions.new">
          Add new subscription
        </LinkTo>
      </div>
    </div>

    <div class="grid-x">
      <div class="cell">
        <h4>Upcoming</h4>
        <SubscriptionTable
          @subscriptions={{this.futureSubscriptions}}
          data-test-subscriptions-type="future"
        />
      </div>
    </div>

    <div class="grid-x">
      <div class="cell">
        <h4>Past</h4>
        <SubscriptionTable
          @subscriptions={{this.pastSubscriptions}}
          data-test-subscriptions-type="past"
        />
      </div>
    </div>
  </template>
}
