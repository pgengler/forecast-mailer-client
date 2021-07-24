import Controller from '@ember/controller';

export default class SubscriptionsIndexController extends Controller {
  get subscriptions() {
    return this.model;
  }

  get currentSubscriptions() {
    return this.subscriptions.filterBy('current');
  }
  get futureSubscriptions() {
    return this.subscriptions.filterBy('future');
  }
  get pastSubscriptions() {
    return this.subscriptions.filterBy('past');
  }
}
