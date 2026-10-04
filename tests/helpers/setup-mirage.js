import { setupMirage } from 'ember-mirage/test-support';
import { makeServer } from 'forecast-mailer/mirage/config';

export { makeServer };

export default function setupMirageForTests(hooks) {
  setupMirage(hooks, {
    createServer: makeServer,
    config: { environment: 'test' },
  });
}
