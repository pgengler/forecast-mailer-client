import { JSONAPISerializer } from '@warp-drive/legacy/serializer/json-api';

export default class SubscriptionSerializer extends JSONAPISerializer {
  attrs = {
    geocoded: { serialize: false },
    createdAt: { serialize: false },
    updatedAt: { serialize: false },
  };
}
