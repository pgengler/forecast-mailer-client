import DS from 'ember-data';
import moment from 'moment';

export default DS.Transform.extend({
  serialize(value) {
    const format = 'YYYY-MM-DDTHH:mm:ssZ';

    if (value != null) {
      if (Object.prototype.toString.call(value) === '[object String]') {
        return moment(value).utc().format(format);
      }
      return value.utc().format(format);
    }
    return value;
  },
  deserialize(value) {
    const date = moment(value);
    if (date.isValid()) {
      return date.utc();
    }
    return null;
  }
});
