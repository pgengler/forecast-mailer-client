import { moduleFor, test } from 'ember-qunit';
import moment from 'moment';

moduleFor('transform:moment-date', 'Unit | Transform | moment-date');

test('it serializes moment dates as YYYY-MM-DDTHH:mm:ssZ strings', function(assert) {
  let transform = this.subject();
  let date = moment('2017-06-26 04:00:00-00:00');
  assert.equal(transform.serialize(date), '2017-06-26T04:00:00+00:00');
});

test('it converts dates to UTC for serialization', function(assert) {
  let transform = this.subject();
  let date = moment('2017-06-26 04:00:00-04:00');
  assert.equal(transform.serialize(date), '2017-06-26T08:00:00+00:00');
});

test('it can serialize string values', function(assert) {
  let transform = this.subject();
  let dateString = '2017-06-26 04:00:00-07:00';
  assert.equal(transform.serialize(dateString), '2017-06-26T11:00:00+00:00');
});

test('it deserializes date strings into moment objects', function(assert) {
  let transform = this.subject();
  let dateString = '2017-06-26T11:00:00+00:00';
  let result = transform.deserialize(dateString);
  assert.ok(result instanceof moment);
  assert.equal(result.format('YYYY-MM-DD'), '2017-06-26');
});

test('invalid date strings are deserialized as nulls', function(assert) {
  let transform = this.subject();
  assert.equal(transform.deserialize('Hello World'), null);
});
