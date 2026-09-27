import { createServer, Model } from 'miragejs';
import SubscriptionFactory from './factories/subscription';
import ApplicationSerializer from './serializers/application';
import defaultScenario from './scenarios/default';

export function makeServer(config: Record<string, unknown> = {}) {
  return createServer({
    ...config,
    models: {
      subscription: Model,
    },
    serializers: {
      application: ApplicationSerializer,
    },
    factories: {
      subscription: SubscriptionFactory,
    },
    seeds: defaultScenario,
    routes() {
      this.namespace = '/api';
      this.resource('subscription');
    },
  });
}
