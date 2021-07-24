import { module, test } from 'qunit';
import { click, currentURL, fillIn, find, findAll, triggerEvent, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

async function select(selector, value) {
  let select = find(selector);
  if (!select) {
    throw new Error(`You called select('${selector}', '${value}'), but no element matched '${selector}'`);
  }

  let options = findAll(`${selector} option`);
  let matchingIndex = null;
  for (let [index, el] of options.entries()) {
    if (el.value === value) {
      matchingIndex = index;
      break;
    }
  }

  if (matchingIndex === null) {
    throw new Error(`You called select('${selector}', '${value}'), but no option with value '${value}' was found.`);
  }
  select.selectedIndex = matchingIndex;

  return triggerEvent(select, 'change');
}

module('Acceptance | Subscriptions | Index', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('/ redirects to /subscriptions', async function (assert) {
    await visit('/');

    assert.equal(currentURL(), '/subscriptions', '/ redirected to /subscriptions');
  });

  test('it lists current subscriptions, past subscriptions, and future subscriptions separately', async function (assert) {
    this.server.createList('subscription', 5, 'current');
    this.server.createList('subscription', 3, 'future');
    this.server.createList('subscription', 11, 'past');

    await visit('/subscriptions');

    assert.dom('[data-test-subscriptions-type=current] .subscription').exists({ count: 5 });
    assert.dom('[data-test-subscriptions-type=future] .subscription').exists({ count: 3 });
    assert.dom('[data-test-subscriptions-type=past] .subscription').exists({ count: 11 });
  });

  test('it lists all subscriptions', async function (assert) {
    this.server.createList('subscription', 12);

    await visit('/subscriptions');

    assert.dom('.subscription').exists({ count: 12 }, 'lists all subscriptions');
  });
});

module('Acceptance | Subscriptions | New', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('adding a new subscription', async function (assert) {
    this.server.create('subscription');

    let savedToServer = false;
    this.server.post('/subscriptions', function ({ subscriptions }) {
      savedToServer = true;

      let newSubscription = subscriptions.create(this.normalizedRequestAttrs());
      return this.serialize(newSubscription);
    });

    await visit('/subscriptions/new');
    await fillIn('input[name=email]', 'email@example.com');
    await fillIn('input[name=location]', 'Springfield, TV');
    await fillIn('input[name=start-date]', '2017-07-01');
    await fillIn('input[name=end-date]', '2017-08-01');
    await click('button[type=submit]');

    assert.ok(savedToServer, 'new subscription saved to server');
    assert.equal(currentURL(), '/subscriptions', 'redirects back to subscription listing');
    assert.dom('.subscription').exists({ count: 2 }, 'displays the newly-added subscription');
    assert.dom('.success').includesText('Subscription created');
  });
});

module('Acceptance | Subscriptions | Edit', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('editing a subscription', async function (assert) {
    let subscription = this.server.create('subscription', {
      email: 'john.doe@example.com',
      location: 'Anytown, USA',
      start: '2017-06-01',
      end: '2017-07-01',
      units: 'us',
    });

    let savedToServer = false;
    this.server.patch('/subscriptions/:id', function ({ subscriptions }, request) {
      savedToServer = true;
      let subscription = subscriptions.find(request.params.id);
      subscription.update(this.normalizedRequestAttrs());
      return this.serialize(subscription);
    });

    await visit(`/subscriptions/${subscription.id}`);

    assert.dom('input[name=email]').hasValue('john.doe@example.com', 'email field contains current initial value');
    assert.dom('input[name=location]').hasValue('Anytown, USA', 'location field contains correct initial value');
    assert.dom('input[name=start-date]').hasValue('2017-06-01', 'start date field contains correct initial value');
    assert.dom('input[name=end-date]').hasValue('2017-07-01', 'end date field contains correct initial value');
    assert.dom('select[name=units]').hasValue('us', 'unit field displays correct initial value');

    await fillIn('input[name=email]', 'jane.doe@example.org');
    await fillIn('input[name=location]', 'Nowheresville');
    await fillIn('input[name=start-date]', '2017-07-01');
    await fillIn('input[name=end-date]', '2017-08-01');
    await select('select[name=units]', 'si');
    await click('button[type=submit]');

    assert.ok(savedToServer, 'changes saved back to server');
    assert.equal(currentURL(), '/subscriptions', 'redirects back to subscription listing');
    assert.dom('.success').includesText('Subscription updated');
    assert.dom('.subscription td:nth-child(1)').hasText('jane.doe@example.org', 'email address was updated');
    assert.dom('.subscription td:nth-child(2)').hasText('Nowheresville', 'location was updated');
    assert.dom('.subscription td:nth-child(3)').hasText('2017-07-01', 'start date was updated');
    assert.dom('.subscription td:nth-child(4)').hasText('2017-08-01', 'end date was updated');
    assert.dom('.subscription td:nth-child(5)').hasText('si', 'units were updated');
  });
});

module('Acceptance | Subscriptions | Delete', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('can remove a subscription', async function (assert) {
    this.server.createList('subscription', 11);
    let subscription = this.server.create('subscription');

    let deletedFromServer = false;
    this.server.delete(
      '/subscriptions/:id',
      function ({ subscriptions }, request) {
        deletedFromServer = true;
        let subscription = subscriptions.find(request.params.id);
        subscription.destroy();
        return '';
      },
      204
    );

    await visit(`/subscriptions/${subscription.id}`);
    await click('button[data-test-delete-button]');

    assert.ok(deletedFromServer, 'made request to server to delete');
    assert.equal(currentURL(), '/subscriptions', 'redirects back to subscription listing');
    assert.dom('.success').includesText('Subscription deleted');
    assert.dom('.subscription').exists({ count: 11 }, 'deleted subscription is not displayed');
  });
});
