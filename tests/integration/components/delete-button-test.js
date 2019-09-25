import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | delete button', function(hooks) {
  setupRenderingTest(hooks);

  test('it has the right CSS classes', async function(assert) {
    this.noop = () => null;
    await render(hbs`
      <DeleteButton @onClick={{noop}} />
      `);

    assert.dom('button').hasClass('button', 'has "button" class');
    assert.dom('button').hasClass('alert', 'has "alert" class');
  });

  test('it sends an action when clicked', async function(assert) {
    let clickActionTriggered = false;
    this.deleteButtonClicked = () => clickActionTriggered = true;

    await render(hbs`
      <DeleteButton @onClick={{deleteButtonClicked}} />
    `);
    await click('button');

    assert.ok(clickActionTriggered, 'action was triggered when button was clicked');
  });
});
