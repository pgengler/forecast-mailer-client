import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';

module('Integration | Component | subscription-row', function(hooks) {
  setupRenderingTest(hooks);

  test('renders start date as YYYY-MM-DD when present', async function(assert) {
    this.subscription = {
      createdAt: moment('2018-12-31'),
      start: moment('2019-01-01')
    };
    await render(hbs`
      <SubscriptionRow @subscription={{this.subscription}} />
    `);

    assert.dom('td:nth-child(3)').hasText('2019-01-01');
    assert.dom('td:nth-child(3)').doesNotHaveClass('indefinite');
  });

  test('when subscription has no start date, adds "" class and displays createdAt timestamp in YYYY-MM-DD format', async function(assert) {
    this.subscription = {
      createdAt: moment('2019-09-25'),
      start: null
    };
    await render(hbs`
      <SubscriptionRow @subscription={{this.subscription}} />
    `);

    assert.dom('td:nth-child(3)').hasText('2019-09-25');
    assert.dom('td:nth-child(3)').hasClass('indefinite');
  });

  test('renders end date as YYYY-MM-DD when present', async function(assert) {
    this.subscription = {
      end: moment('2019-01-01', 'YYYY-MM-DD')
    };
    await render(hbs`
      <SubscriptionRow @subscription={{this.subscription}} />
    `);

    assert.dom('td:nth-child(4)').hasText('2019-01-01');
  });

  test('renders nothing for end date when not present', async function(assert) {
    this.subscription = {
      end: null
    };
    await render(hbs`
      <SubscriptionRow @subscription={{this.subscription}} />
    `);

    assert.dom('td:nth-child(4)').hasText('');
  });
});
