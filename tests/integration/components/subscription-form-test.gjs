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
        <SubscriptionForm @formSubmitted={{this.formSubmitted}} @subscription={{this.subscription}} />
      </template>,
    );
    await click('button[type=submit]');

    assert.ok(formSubmitActionTriggered, 'form-submitted action was sent');
  });

  test('it renders <:secondary-action> content when some is provided', async function (assert) {
    const noop = () => null;

    await render(
      <template>
        <SubscriptionForm @formSubmitted={{noop}} @subscription={{this.subscription}}>
          <:secondary-action>
            <div data-test-secondary-action-content>Foo</div>
          </:secondary-action>
        </SubscriptionForm>
      </template>,
    );

    assert.dom('[data-test-secondary-action-content]').exists('<:secondary-action> content is rendered');
  });
});
