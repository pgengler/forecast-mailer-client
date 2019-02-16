import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    saveSubscription(subscription) {
      subscription.save()
      .then(() => this.get('flashMessages').success('Subscription created'))
      .then(() => this.transitionToRoute('subscriptions.index'));
    }
  }
});
