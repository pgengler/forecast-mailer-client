import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class SubscriptionsEditController extends Controller {
  @action
  deleteSubscription() {
    this.model.destroyRecord()
    .then(() => this.flashMessages.success('Subscription deleted'))
    .then(() => this.transitionToRoute('subscriptions.index'));
  }

  @action
  saveSubscription(subscription) {
    subscription.save()
    .then(() => this.flashMessages.success('Subscription updated', { timeout: 30000 }))
    .then(() => this.transitionToRoute('subscriptions.index'));
  }
}
