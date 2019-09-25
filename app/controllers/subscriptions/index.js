import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';

export default class SubscriptionsIndexController extends Controller {
  @alias('model') subscriptions;

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
