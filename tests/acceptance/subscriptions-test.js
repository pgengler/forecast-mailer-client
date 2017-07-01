import { test } from 'qunit';
import moduleForAcceptance from 'forecast-mailer/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | Subscriptions');

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
  });
});
