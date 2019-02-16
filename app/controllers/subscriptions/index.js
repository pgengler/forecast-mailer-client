import Controller from '@ember/controller';
import { alias, filterBy } from '@ember/object/computed';

export default Controller.extend({
  subscriptions: alias('model'),

  currentSubscriptions: filterBy('subscriptions', 'current'),
  futureSubscriptions: filterBy('subscriptions', 'future'),
  pastSubscriptions: filterBy('subscriptions', 'past')
});
