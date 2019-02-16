import Component from '@ember/component';

export default Component.extend({
  tagName: '',

  'on-click': () => { /* noop */ },

  actions: {
    clicked() {
      this.get('on-click')();
    }
  }
});
