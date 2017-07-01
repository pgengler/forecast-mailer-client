import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('subscription-form', 'Integration | Component | subscription-form', {
  integration: true
});

test('it sends a form-submitted action when form is submitted', function(assert) {
  assert.expect(1);
  this.set('formSubmitted', function() {
    assert.ok(true, 'form-submitted action was sent');
  });
  this.set('subscription', Ember.Object.create());
  this.render(hbs`
    {{subscription-form
      subscription=subscription
      form-submitted=formSubmitted
    }}
  `);
  this.$('input[type=submit]').click();
});
