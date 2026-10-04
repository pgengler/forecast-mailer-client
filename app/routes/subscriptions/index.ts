import Route from '@ember/routing/route';
import { service } from '@ember/service';
import type Store from 'forecast-mailer/services/store';
import type Subscription from 'forecast-mailer/models/subscription';

export type SubscriptionsIndexRouteModel = Subscription[];

export default class SubscriptionsIndexRoute extends Route {
  @service declare store: Store;

  async model(): Promise<SubscriptionsIndexRouteModel> {
    return this.store.findAll('subscription') as Promise<SubscriptionsIndexRouteModel>;
  }
}
