import Component from '@glimmer/component';
import { service } from '@ember/service';
import { FlashMessage } from 'ember-cli-flash';
import type FlashMessagesService from 'ember-cli-flash/services/flash-messages';

interface FlashMessagesSignature {
  Args: Record<string, never>;
}

export default class FlashMessages extends Component<FlashMessagesSignature> {
  @service declare flashMessages: FlashMessagesService;

  <template>
    {{#each this.flashMessages.queue as |item|}}
      <FlashMessage @flash={{item}} as |_component flash|>
        <div class="grid-x">
          <div class="large-6 cell">
            <div data-alert class="callout {{flash.type}}">
              {{flash.message}}
            </div>
          </div>
        </div>
      </FlashMessage>
    {{/each}}
  </template>
}
