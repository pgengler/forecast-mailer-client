import Component from '@glimmer/component';

const DATE_FORMAT = 'YYYY-MM-DD';

export default class SubscriptionRowComponent extends Component {
  get formattedEnd() {
    let date = this.args.subscription.end;
    return date ? date.format(DATE_FORMAT) : '';
  }

  get formattedStart() {
    let date = this.args.subscription.start || this.args.subscription.createdAt;
    return date ? date.format(DATE_FORMAT) : '';
  }
}
