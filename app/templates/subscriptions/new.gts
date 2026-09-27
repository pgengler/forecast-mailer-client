import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';
import SubscriptionForm from 'forecast-mailer/components/subscription-form';
import type { SubscriptionsNewRouteModel } from 'forecast-mailer/routes/subscriptions/new';
import type { FlashMessagesService } from 'ember-cli-flash';
import type RouterService from '@ember/routing/router-service';

interface SubscriptionsNewSignature {
  Args: {
    model: SubscriptionsNewRouteModel;
  };
}

export default class SubscriptionsNew extends Component<SubscriptionsNewSignature> {
  @service declare router: RouterService;
  @service declare flashMessages: FlashMessagesService;

  @action
  async saveSubscription(
    subscription: SubscriptionsNewRouteModel,
  ): Promise<void> {
    await subscription.save();
    this.flashMessages.success('Subscription created');
    this.router.transitionTo('subscriptions.index');
  }

  <template>
    <div class="grid-x">
      <div class="cell">
        <h1>Create new subscription</h1>
      </div>
    </div>

    <SubscriptionForm
      @subscription={{@model}}
      @formSubmitted={{this.saveSubscription}}
    />
  </template>
}
