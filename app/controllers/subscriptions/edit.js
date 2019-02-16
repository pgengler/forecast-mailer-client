import Controller from '@ember/controller';

export default Controller.extend({
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
