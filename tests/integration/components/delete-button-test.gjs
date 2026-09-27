import { module, test } from 'qunit';
import { setupRenderingTest } from 'forecast-mailer/tests/helpers';
import { click, render } from '@ember/test-helpers';
import DeleteButton from 'forecast-mailer/components/delete-button';

module('Integration | Component | delete button', function (hooks) {
  setupRenderingTest(hooks);

  test('it has the right CSS classes', async function (assert) {
    this.noop = () => null;
    await render(<template><DeleteButton @onClick={{this.noop}} /></template>);

    assert.dom('button').hasClass('button', 'has "button" class');
    assert.dom('button').hasClass('alert', 'has "alert" class');
  });

  test('it sends an action when clicked', async function (assert) {
    let clickActionTriggered = false;
    this.deleteButtonClicked = () => (clickActionTriggered = true);

    await render(
      <template>
        <DeleteButton @onClick={{this.deleteButtonClicked}} />
      </template>,
    );
    await click('button');

    assert.ok(
      clickActionTriggered,
      'action was triggered when button was clicked',
    );
  });
});
