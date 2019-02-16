import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import Component from '@ember/component';
import EmberObject from '@ember/object';

module('Integration | Component | subscription-form', function(hooks) {
  setupRenderingTest(hooks);

  test('it sends a form-submitted action when form is submitted', async function(assert) {
    let formSubmitActionTriggered = false;
    this.setProperties({
      formSubmitted: () => formSubmitActionTriggered = true,
      subscription: EmberObject.create()
    });

    await render(hbs`
      {{subscription-form
        form-submitted=formSubmitted
        subscription=subscription
      }}
    `);
    await click('input[type=submit]');

    assert.ok(formSubmitActionTriggered, 'form-submitted action was sent');
  });

  test('it renders a secondary button, if one is passed', async function(assert) {
    this.owner.register('component:dummy-component', Component.extend({
      tagName: 'dummy'
    }));

    this.set('subscription', EmberObject.create());

    await render(hbs`
      {{subscription-form
        secondaryButton=(component "dummy-component")
        subscription=subscription
      }}
    `);
    assert.dom('dummy').exists('secondary button component is rendered');
  });
});
