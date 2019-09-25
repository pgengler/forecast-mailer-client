import Route from '@ember/routing/route';

export default class SubscriptionsNewRoute extends Route {
  model() {
    return this.store.createRecord('subscription');
  }
}
