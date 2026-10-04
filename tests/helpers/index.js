import {
  setupApplicationTest as upstreamSetupApplicationTest,
  setupRenderingTest as upstreamSetupRenderingTest,
  setupTest as upstreamSetupTest,
} from 'ember-qunit';

// This file exists to provide wrappers around ember-qunit's
// test setup functions. This way, you can easily extend the setup that is
// needed per test type.

function setupApplicationTest(hooks, options) {
  upstreamSetupApplicationTest(hooks, options);
}

function setupRenderingTest(hooks, options) {
  upstreamSetupRenderingTest(hooks, options);
}

function setupTest(hooks, options) {
  upstreamSetupTest(hooks, options);
}

export { setupApplicationTest, setupRenderingTest, setupTest };
