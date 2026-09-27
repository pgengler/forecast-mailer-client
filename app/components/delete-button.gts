import Component from '@glimmer/component';
import { on } from '@ember/modifier';

interface DeleteButtonSignature {
  Args: {
    onClick: () => void;
  };
}

export default class DeleteButton extends Component<DeleteButtonSignature> {
  get onClick(): () => void {
    return this.args.onClick;
  }

  <template>
    <button
      class="alert button"
      type="button"
      {{on "click" this.onClick}}
      data-test-delete-button
    >
      Delete
    </button>
  </template>
}
