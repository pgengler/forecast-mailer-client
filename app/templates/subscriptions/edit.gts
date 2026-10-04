import { on } from '@ember/modifier';
import { action } from '@ember/object';
import type RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import type { FlashMessagesService } from 'ember-cli-flash';
import SubscriptionForm from 'forecast-mailer/components/subscription-form';
import type { SubscriptionsEditRouteModel } from 'forecast-mailer/routes/subscriptions/edit';

interface SubscriptionsEditSignature {
  Args: {
    model: SubscriptionsEditRouteModel;
  };
}

export default class SubscriptionsEdit extends Component<SubscriptionsEditSignature> {
  @service declare flashMessages: FlashMessagesService;
  @service declare router: RouterService;

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
    >
      <:secondary-action>
        <button
          class="alert button"
          type="button"
          {{on "click" this.deleteSubscription}}
          data-test-delete-button
        >
          Delete
        </button>
      </:secondary-action>
    </SubscriptionForm>
  </template>
}
