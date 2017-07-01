import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('delete-button', 'Integration | Component | delete button', {
  integration: true
});

test('it has the right CSS classes', function(assert) {
  this.render(hbs`{{delete-button}}`);

  assert.ok(this.$('button').hasClass('button'), 'has "button" class');
  assert.ok(this.$('button').hasClass('alert'), 'has "alert" class');
});

test('it sends an action when clicked', function(assert) {
  assert.expect(1);
  this.on('deleteButtonClicked', function() {
    assert.ok(true, 'action was triggered when button was clicked');
  });
  this.render(hbs`
    {{delete-button
      on-click=(action 'deleteButtonClicked')
    }}
  `);
  this.$('button').click();
});
