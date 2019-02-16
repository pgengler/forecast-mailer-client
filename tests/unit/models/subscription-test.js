import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import moment from 'moment';

module('Unit | Model | subscription', function(hooks) {
  setupTest(hooks);
  hooks.beforeEach(function() {
    this.store = this.owner.lookup('service:store');
  });

  module('#past', function() {
    test('returns true when end date is before current date', function(assert) {
      let model = this.store.createRecord('subscription', {
        end: moment().subtract(1, 'month')
      });

      assert.equal(model.get('past'), true);
    });

    test('returns false when end date is after current date', function(assert) {
      let model = this.store.createRecord('subscription', {
        end: moment().add(1, 'month')
      });

      assert.equal(model.get('past'), false);
    });

    test('returns true when end date is same day as current date', function(assert) {
      let model = this.store.createRecord('subscription', {
        end: moment()
      });

      assert.equal(model.get('past'), true);
    });
  });

  module('#current', function() {
    test('returns true when start date is in the past and no end date is present', function(assert) {
      let model = this.store.createRecord('subscription', {
        end: null,
        start: moment().subtract(1, 'month')
      });

      assert.equal(model.get('current'), true);
    });

    test('returns true when start date is in the past and end date is in the future', function(assert) {
      let model = this.store.createRecord('subscription', {
        end: moment().add(1, 'month'),
        start: moment().subtract(1, 'week')
      });

      assert.equal(model.get('current'), true);
    });

    test('returns false when start date is in the past and so is the end date', function(assert) {
      let model = this.store.createRecord('subscription', {
        end: moment().subtract(1, 'week'),
        start: moment().subtract(1, 'month')
      });

      assert.equal(model.get('current'), false);
    });

    test('returns false when start date is in the future', function(assert) {
      let model = this.store.createRecord('subscription', {
        start: moment().add(1, 'week')
      });

      assert.equal(model.get('current'), false);
    });

    test('returns true when start date is the current date', function(assert) {
      let model = this.store.createRecord('subscription', {
        start: moment()
      });

      assert.equal(model.get('current'), true);
    });

    test('returns false when end date is the current date', function(assert) {
      let model = this.store.createRecord('subscription', {
        end: moment(),
        start: moment().subtract(1, 'day')
      });

      assert.equal(model.get('current'), false);
    });

    test('returns true when no start date is present and no end date is present', function(assert) {
      let model = this.store.createRecord('subscription', {
        end: null,
        start: null
      });

      assert.equal(model.get('current'), true);
    });

    test('returns true when no start date is present and end date is in the future', function(assert) {
      let model = this.store.createRecord('subscription', {
        end: moment().add(1, 'week'),
        start: null
      });

      assert.equal(model.get('current'), true);
    });

    test('returns false when no start date is present and end date is in the past', function(assert) {
      let model = this.store.createRecord('subscription', {
        end: moment().subtract(1, 'week'),
        start: null
      });

      assert.equal(model.get('current'), false);
    });

    test('returns false when no start date is present and end date is the current date', function(assert) {
      let model = this.store.createRecord('subscription', {
        end: moment(),
        start: null
      });

      assert.equal(model.get('current'), false);
    });
  });

  module('#future', function() {
    test('returns true when start date is in the future', function(assert) {
      let model = this.store.createRecord('subscription', {
        start: moment().add(1, 'week')
      });

      assert.equal(model.get('future'), true);
    });

    test('returns false when start date is in the past', function(assert) {
      let model = this.store.createRecord('subscription', {
        start: moment().subtract(1, 'week')
      });

      assert.equal(model.get('future'), false);
    });

    test('returns false when start date is the current date', function(assert) {
      let model = this.store.createRecord('subscription', {
        start: moment()
      });

      assert.equal(model.get('future'), false);
    });
  });
});
