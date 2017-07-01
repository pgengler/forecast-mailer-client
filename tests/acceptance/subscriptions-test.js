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
