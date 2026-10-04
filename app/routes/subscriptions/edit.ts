import Route from '@ember/routing/route';
import { service } from '@ember/service';
import type Store from 'forecast-mailer/services/store';
import type Subscription from 'forecast-mailer/models/subscription';

export type SubscriptionsEditRouteModel = Subscription;

export default class SubscriptionsEditRoute extends Route {
  @service declare store: Store;

  async model(params: { id: string }): Promise<SubscriptionsEditRouteModel> {
    return this.store.findRecord('subscription', params.id) as Promise<SubscriptionsEditRouteModel>;
  }
}
