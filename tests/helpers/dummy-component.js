import Ember from 'ember';

export default function registerDummyComponent(context, name = 'dummy-component', opts = {}) {
  let owner = Ember.getOwner(context);
  let options = Ember.assign({ tagName: 'dummy' }, opts);
  let DummyComponent = Ember.Component.extend(options);

  unregisterDummyComponent(context);
  owner.register(`component:${name}`, DummyComponent);
}

export function unregisterDummyComponent(context, name = 'dummy-component') {
  let owner = Ember.getOwner(context);

  if (owner.resolveRegistration(`component:${name}`)) {
    owner.unregister(`component:${name}`);
  }
}
