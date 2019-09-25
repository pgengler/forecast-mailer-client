import Route from '@ember/routing/route';

export default class SubscriptionIndexRoute extends Route {
  model() {
    return this.store.findAll('subscription');
  }
}
