import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class SubscriptionsNewController extends Controller {
  @service router;

  @action
  async saveSubscription(subscription) {
    await subscription.save();
    this.flashMessages.success('Subscription created');
    this.router.transitionTo('subscriptions.index');
  }
}
