import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class SubscriptionsEditController extends Controller {
  @service flashMessages;
  @service router;

  @action
  async deleteSubscription() {
    await this.model.destroyRecord();
    this.flashMessages.success('Subscription deleted');
    this.router.transitionTo('subscriptions.index');
  }

  @action
  async saveSubscription(subscription) {
    await subscription.save();
    this.flashMessages.success('Subscription updated', { timeout: 30000 });
    this.router.transitionTo('subscriptions.index');
  }
}
