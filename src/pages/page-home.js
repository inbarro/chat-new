import { html } from 'lit';
import { Logo, Feature } from '../components';
import { urlForName } from '../router';
import { PageElement } from '../helpers/page-element';
import { Question } from '../components/question'
import { Chat } from '../components/chat'


export class PageHome extends PageElement {

  render() {
    return html` 
        <component-chat colour = black class="page-chat"></component-chat>
       `;
  }
}

customElements.define('page-home', PageHome);
