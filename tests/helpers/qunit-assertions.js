window.QUnit.assert.flashSuccess = function(message) {
  let selectorCount = find(`.alert-success:contains(${message})`).length;
  this.pushResult({ result: (selectorCount === 1), actual: selectorCount, expected: 1, message: `Flash success message containing "${message}" exists` });
};
