import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('subscriptions', function() {
    this.route('new');
    this.route('edit', { path: '/:id' });
  });
});

export default Router;
