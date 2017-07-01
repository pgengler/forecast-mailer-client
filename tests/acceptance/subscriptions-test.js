import { test } from 'qunit';
import moduleForAcceptance from 'forecast-mailer/tests/helpers/module-for-acceptance';
import { select } from 'forecast-mailer/tests/helpers/x-select';

moduleForAcceptance('Acceptance | Subscriptions | Index');

test('it lists all subscriptions', function(assert) {
  server.createList('subscription', 12);

  visit('/subscriptions');
  andThen(() => {
    assert.equal(find('.subscription').length, 12, 'lists all subscriptions');
  });
});

test('dates are formatted as YYYY-MM-DD', function(assert) {
  server.create('subscription', {
    start: '2017-06-01',
    end: '2017-07-01'
  });

  visit('/subscriptions');
  andThen(() => {
    assert.equal(find('.subscription td:eq(2)').text().trim(), '2017-06-01', 'start date is formatted as YYYY-MM-DD');
    assert.equal(find('.subscription td:eq(3)').text().trim(), '2017-07-01', 'end date is formated as YYYY-MM-DD');
  });
});

moduleForAcceptance('Acceptance | Subscriptions | New');

test('adding a new subscription', function(assert) {
  server.create('subscription');

  let savedToServer = false;
  server.post('/subscriptions', function({ subscriptions }) {
    savedToServer = true;

    let newSubscription = subscriptions.create(this.normalizedRequestAttrs());
    return this.serialize(newSubscription);
  });

  visit('/subscriptions/new');
  fillIn('input[name=email]', 'email@example.com');
  fillIn('input[name=location]', 'Springfield, TV');
  fillIn('input[name=start-date]', '2017-07-01');
  fillIn('input[name=end-date]', '2017-08-01');
  click('input[type=submit]');

  andThen(() => {
    assert.ok(savedToServer, 'new subscription saved to server');
    assert.equal(currentURL(), '/subscriptions', 'redirects back to subscription listing');
    assert.equal(find('.subscription').length, 2, 'displays the newly-added subscription');
    assert.flashSuccess('Subscription created');
  });
});

moduleForAcceptance('Acceptance | Subscriptions | Edit');

test('editing a subscription', function(assert) {
  let subscription = server.create('subscription', {
    email: 'john.doe@example.com',
    location: 'Anytown, USA',
    start: '2017-06-01',
    end: '2017-07-01',
    units: 'us'
  });

  let savedToServer = false;
  server.patch('/subscriptions/:id', function({ subscriptions }, request) {
    savedToServer = true;
    let subscription = subscriptions.find(request.params.id);
    subscription.update(this.normalizedRequestAttrs());
    return this.serialize(subscription);
  });

  visit(`/subscriptions/${subscription.id}`);
  andThen(() => {
    assert.equal(find('input[name=email]').val(), 'john.doe@example.com', 'email field contains current initial value');
    assert.equal(find('input[name=location]').val(), 'Anytown, USA', 'location field contains correct initial value');
    assert.equal(find('input[name=start-date]').val(), '2017-06-01', 'start date field contains correct initial value');
    assert.equal(find('input[name=end-date]').val(), '2017-07-01', 'end date field contains correct initial value');
    assert.equal(find('select[name=units]').val(), 'us', 'unit field displays correct initial value');
  });

  fillIn('input[name=email]', 'jane.doe@example.org');
  fillIn('input[name=location]', 'Nowheresville');
  fillIn('input[name=start-date]', '2017-07-01');
  fillIn('input[name=end-date]', '2017-08-01');
  andThen(() => select('select[name=units]', 'si'));
  click('input[type=submit]');

  andThen(() => {
    assert.ok(savedToServer, 'changes saved back to server');
    assert.equal(currentURL(), '/subscriptions', 'redirects back to subscription listing');
    assert.flashSuccess('Subscription updated');
    assert.equal(find('.subscription td:eq(0)').text().trim(), 'jane.doe@example.org', 'email address was updated');
    assert.equal(find('.subscription td:eq(1)').text().trim(), 'Nowheresville', 'location was updated');
    assert.equal(find('.subscription td:eq(2)').text().trim(), '2017-07-01', 'start date was updated');
    assert.equal(find('.subscription td:eq(3)').text().trim(), '2017-08-01', 'end date was updated');
    assert.equal(find('.subscription td:eq(4)').text().trim(), 'si', 'units were updated');
  });
});

moduleForAcceptance('Acceptance | Subscriptions | Delete');

test('can remove a subscription', function(assert) {
  server.createList('subscription', 11);
  let subscription = server.create('subscription');

  let deletedFromServer = false;
  server.delete('/subscriptions/:id', function({ subscriptions }, request) {
    deletedFromServer = true;
    let subscription = subscriptions.find(request.params.id);
    subscription.destroy();
    return '';
  }, 204);

  visit(`/subscriptions/${subscription.id}`);
  click('button:contains(Delete)');

  andThen(() => {
    assert.ok(deletedFromServer, 'made request to server to delete');
    assert.equal(currentURL(), '/subscriptions', 'redirects back to subscription listing');
    assert.flashSuccess('Subscription deleted');
    assert.equal(find('.subscription').length, 11, 'deleted subscription is not displayed');
  });
});
