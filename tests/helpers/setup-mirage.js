import { setupMirage } from 'ember-mirage/test-support';
import { makeServer } from 'forecast-mailer/mirage/config';

export { setupMirage, makeServer };

export default function setupMirageForTests(hooks) {
  setupMirage(hooks, { createServer: makeServer });
}
