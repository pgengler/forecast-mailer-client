import { Transform } from '@warp-drive/legacy/serializer/transform';
import moment from 'moment';

export default class MomentDateTransform extends Transform {
  serialize(value: moment.Moment | string | null): string | null {
    const format = 'YYYY-MM-DDTHH:mm:ssZ';

    if (value != null) {
      if (Object.prototype.toString.call(value) === '[object String]') {
        return moment(value).utc().format(format);
      }
      return (value as moment.Moment).utc().format(format);
    }
    return value;
  }

  deserialize(value: string): moment.Moment | null {
    const date = moment(value);
    if (date.isValid()) {
      return date.utc();
    }
    return null;
  }
}
