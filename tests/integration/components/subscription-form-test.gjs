import { module, test } from 'qunit';
import { setupRenderingTest } from 'forecast-mailer/tests/helpers';
import { click, render } from '@ember/test-helpers';
import SubscriptionForm from 'forecast-mailer/components/subscription-form';

module('Integration | Component | subscription-form', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.store = this.owner.lookup('service:store');
    this.subscription = this.store.createRecord('subscription');
  });

  test('it sends a formSubmitted action when form is submitted', async function (assert) {
    let formSubmitActionTriggered = false;

    this.formSubmitted = () => (formSubmitActionTriggered = true);

    await render(
      <template>
        <SubscriptionForm
          @formSubmitted={{this.formSubmitted}}
          @subscription={{this.subscription}}
        />
      </template>,
    );
    await click('button[type=submit]');

    assert.ok(formSubmitActionTriggered, 'form-submitted action was sent');
  });

  test('it renders a delete button when onDelete is provided', async function (assert) {
    this.onDelete = () => null;
    this.formSubmitted = () => null;

    await render(
      <template>
        <SubscriptionForm
          @formSubmitted={{this.formSubmitted}}
          @subscription={{this.subscription}}
          @onDelete={{this.onDelete}}
        />
      </template>,
    );

    assert.dom('[data-test-delete-button]').exists('delete button is rendered');
  });
});
