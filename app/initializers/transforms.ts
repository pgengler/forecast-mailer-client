import type Application from '@ember/application';
import {
  StringTransform,
  BooleanTransform,
  DateTransform,
  NumberTransform,
} from '@warp-drive/legacy/serializer/transform';
import MomentDateTransform from 'forecast-mailer/transforms/moment-date';

export function initialize(application: Application): void {
  application.register('transform:string', StringTransform);
  application.register('transform:boolean', BooleanTransform);
  application.register('transform:date', DateTransform);
  application.register('transform:number', NumberTransform);
  application.register('transform:moment-date', MomentDateTransform);
}

export default {
  name: 'transforms',
  initialize,
};
