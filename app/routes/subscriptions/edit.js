import Route from '@ember/routing/route';

export default class SubscriptionsEditRoute extends Route {
  model(params) {
    return this.store.findRecord('subscription', params.id);
  }
}
