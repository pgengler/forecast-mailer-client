import resolver from './helpers/resolver';
import './helpers/flash-message';

import {
  setResolver
} from 'ember-qunit';
import { start } from 'ember-cli-qunit';
import './helpers/qunit-assertions';

setResolver(resolver);
start();
