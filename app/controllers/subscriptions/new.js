import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class SubscriptionsNewController extends Controller {
  @action
  saveSubscription(subscription) {
    subscription.save()
    .then(() => this.flashMessages.success('Subscription created'))
    .then(() => this.transitionToRoute('subscriptions.index'));
  }
}
