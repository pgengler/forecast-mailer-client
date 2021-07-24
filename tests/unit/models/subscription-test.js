import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import moment from 'moment';

module('Unit | Model | subscription', function (hooks) {
  setupTest(hooks);
  hooks.beforeEach(function () {
    this.store = this.owner.lookup('service:store');
  });

  module('#past', function () {
    test('returns true when end date is before current date', function (assert) {
      let model = this.store.createRecord('subscription', {
        end: moment().subtract(1, 'month'),
      });

      assert.true(model.get('past'));
    });

    test('returns false when end date is after current date', function (assert) {
      let model = this.store.createRecord('subscription', {
        end: moment().add(1, 'month'),
      });

      assert.false(model.get('past'));
    });

    test('returns true when end date is same day as current date', function (assert) {
      let model = this.store.createRecord('subscription', {
        end: moment(),
      });

      assert.true(model.get('past'));
    });
  });

  module('#current', function () {
    test('returns true when start date is in the past and no end date is present', function (assert) {
      let model = this.store.createRecord('subscription', {
        end: null,
        start: moment().subtract(1, 'month'),
      });

      assert.true(model.get('current'));
    });

    test('returns true when start date is in the past and end date is in the future', function (assert) {
      let model = this.store.createRecord('subscription', {
        end: moment().add(1, 'month'),
        start: moment().subtract(1, 'week'),
      });

      assert.true(model.get('current'));
    });

    test('returns false when start date is in the past and so is the end date', function (assert) {
      let model = this.store.createRecord('subscription', {
        end: moment().subtract(1, 'week'),
        start: moment().subtract(1, 'month'),
      });

      assert.false(model.get('current'));
    });

    test('returns false when start date is in the future', function (assert) {
      let model = this.store.createRecord('subscription', {
        start: moment().add(1, 'week'),
      });

      assert.false(model.get('current'));
    });

    test('returns true when start date is the current date', function (assert) {
      let model = this.store.createRecord('subscription', {
        start: moment(),
      });

      assert.true(model.get('current'));
    });

    test('returns false when end date is the current date', function (assert) {
      let model = this.store.createRecord('subscription', {
        end: moment(),
        start: moment().subtract(1, 'day'),
      });

      assert.false(model.get('current'));
    });

    test('returns true when no start date is present and no end date is present', function (assert) {
      let model = this.store.createRecord('subscription', {
        end: null,
        start: null,
      });

      assert.true(model.get('current'));
    });

    test('returns true when no start date is present and end date is in the future', function (assert) {
      let model = this.store.createRecord('subscription', {
        end: moment().add(1, 'week'),
        start: null,
      });

      assert.true(model.get('current'));
    });

    test('returns false when no start date is present and end date is in the past', function (assert) {
      let model = this.store.createRecord('subscription', {
        end: moment().subtract(1, 'week'),
        start: null,
      });

      assert.false(model.get('current'));
    });

    test('returns false when no start date is present and end date is the current date', function (assert) {
      let model = this.store.createRecord('subscription', {
        end: moment(),
        start: null,
      });

      assert.false(model.get('current'));
    });
  });

  module('#future', function () {
    test('returns true when start date is in the future', function (assert) {
      let model = this.store.createRecord('subscription', {
        start: moment().add(1, 'week'),
      });

      assert.true(model.get('future'));
    });

    test('returns false when start date is in the past', function (assert) {
      let model = this.store.createRecord('subscription', {
        start: moment().subtract(1, 'week'),
      });

      assert.false(model.get('future'));
    });

    test('returns false when start date is the current date', function (assert) {
      let model = this.store.createRecord('subscription', {
        start: moment(),
      });

      assert.false(model.get('future'));
    });
  });
});
