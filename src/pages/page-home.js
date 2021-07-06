import { html, css, LitElement} from 'lit';
import { Logo, Feature } from '../components';
import { urlForName } from '../router';
// import { PageElement } from '../helpers/page-element';

import { Question } from '../components/question'
import { Chat } from '../components/chat'
import { Header } from '../components/header';
import '@vaadin/vaadin-ordered-layout'


export class PageHome extends LitElement {

  static get styles() {
    return css`
        .page-chat {
          width: 90%
        }
    
    `};

  render() {
    return html` 
        <component-header></component-header>
        <component-chat class="page-chat"></component-chat>
       `;
  }
}

customElements.define('page-home', PageHome);
