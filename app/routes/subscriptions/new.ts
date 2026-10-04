import Route from '@ember/routing/route';
import { service } from '@ember/service';
import type Store from 'forecast-mailer/services/store';
import type Subscription from 'forecast-mailer/models/subscription';

export type SubscriptionsNewRouteModel = Subscription;

export default class SubscriptionsNewRoute extends Route {
  @service declare store: Store;

  model(): SubscriptionsNewRouteModel {
    return this.store.createRecord('subscription', {}) as SubscriptionsNewRouteModel;
  }
}
