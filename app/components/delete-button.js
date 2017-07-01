import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',

  actions: {
    clicked() {
      this.sendAction('on-click');
    }
  }
});
