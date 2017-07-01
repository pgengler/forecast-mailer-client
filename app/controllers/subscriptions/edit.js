import Ember from 'ember';
import Changeset from 'ember-changeset';

export default Ember.Controller.extend({
  subscriptionChangeset: Ember.computed('model', function() {
    return new Changeset(this.get('model'));
  }),

  actions: {
    deleteSubscription() {
      this.get('model').destroyRecord()
      .then(() => this.get('flashMessages').success('Subscription deleted'))
      .then(() => this.transitionToRoute('subscriptions.index'));
    },

    saveSubscription(subscription) {
      subscription.save()
      .then(() => this.get('flashMessages').success('Subscription updated', { timeout: 30000 }))
      .then(() => this.transitionToRoute('subscriptions.index'));
    }
  }
});
