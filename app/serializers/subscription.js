import JSONAPISerializer from '@ember-data/serializer/json-api';

export default class SubscriptionSerializer extends JSONAPISerializer {
  attrs = {
    createdAt: { serialize: false },
    updatedAt: { serialize: false }
  }
}
