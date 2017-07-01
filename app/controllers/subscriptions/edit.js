import Ember from 'ember';
import Changeset from 'ember-changeset';

export default Ember.Controller.extend({
  subscriptionChangeset: Ember.computed('model', function() {
    return new Changeset(this.get('model'));
  }),

  actions: {
    saveSubscription(subscription) {
      subscription.save()
      .then(() => this.transitionToRoute('subscriptions.index'));
    }
  }
});
