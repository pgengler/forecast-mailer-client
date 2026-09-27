import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';
import SubscriptionForm from 'forecast-mailer/components/subscription-form';
import type { SubscriptionsEditRouteModel } from 'forecast-mailer/routes/subscriptions/edit';
import type { FlashMessagesService } from 'ember-cli-flash';
import type RouterService from '@ember/routing/router-service';

interface SubscriptionsEditSignature {
  Args: {
    model: SubscriptionsEditRouteModel;
  };
}

export default class SubscriptionsEdit extends Component<SubscriptionsEditSignature> {
  @service declare router: RouterService;
  @service declare flashMessages: FlashMessagesService;

  @action
  async deleteSubscription(): Promise<void> {
    await this.args.model.destroyRecord();
    this.flashMessages.success('Subscription deleted');
    this.router.transitionTo('subscriptions.index');
  }

  @action
  async saveSubscription(
    subscription: SubscriptionsEditRouteModel,
  ): Promise<void> {
    await subscription.save();
    this.flashMessages.success('Subscription updated', { timeout: 30000 });
    this.router.transitionTo('subscriptions.index');
  }

  <template>
    <div class="grid-x">
      <div class="cell">
        <h1>Modify subscription</h1>
      </div>
    </div>

    <SubscriptionForm
      @subscription={{@model}}
      @formSubmitted={{this.saveSubscription}}
      @onDelete={{this.deleteSubscription}}
    />
  </template>
}
