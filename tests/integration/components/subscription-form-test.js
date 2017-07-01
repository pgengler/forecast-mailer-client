import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import registerDummyComponent from 'forecast-mailer/tests/helpers/dummy-component';

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

test('it renders a secondary button, if one is passed', function(assert) {
  registerDummyComponent(this);
  this.set('subscription', Ember.Object.create());
  this.render(hbs`
    {{subscription-form
      subscription=subscription
      secondaryButton=(component "dummy-component")
    }}
  `);
  assert.equal(this.$('dummy').length, 1, 'secondary button component is rendered');
});
