'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const path = require('path');
const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');
const nodeSass = require('node-sass');

module.exports = function (defaults) {
  let foundationPath = path.resolve(require.resolve('foundation-sites'), '../../..');
  let foundationFunnel = mergeTrees([
    new Funnel(foundationPath, {
      include: ['_vendor/**/*'],
    }),
    new Funnel(path.join(foundationPath, 'scss'), {
      destDir: 'foundation-sites',
      include: ['**/*'],
    }),
  ]);
  let app = new EmberApp(defaults, {
    sassOptions: {
      implementation: nodeSass,
      includePaths: [foundationFunnel],
    },
    // Add options here
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
