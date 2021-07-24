import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';

module('Integration | Component | subscription-form', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.subscription = EmberObject.create();
  });

  test('it sends a formSubmitted action when form is submitted', async function (assert) {
    let formSubmitActionTriggered = false;

    this.formSubmitted = () => (formSubmitActionTriggered = true);

    await render(hbs`
      <SubscriptionForm
        @formSubmitted={{this.formSubmitted}}
        @subscription={{this.subscription}}
      />
    `);
    await click('button[type=submit]');

    assert.ok(formSubmitActionTriggered, 'form-submitted action was sent');
  });

  test('it renders a secondary button, if one is passed', async function (assert) {
    this.owner.register('template:components/dummy-component', hbs`<span id="dummy-element"></span>`);

    await render(hbs`
      <SubscriptionForm
        @secondaryButton={{component "dummy-component"}}
        @subscription={{this.subscription}}
      />
    `);
    assert.dom('#dummy-element').exists('secondary button component is rendered');
  });
});
