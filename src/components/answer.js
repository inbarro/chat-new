import { html } from 'lit';
import { PageElement } from '../helpers/page-element';
import { LitElement } from './base';

export class Answer extends LitElement {
  static get properties() {
    return {
      answer_user: String,
      answer_text: String
    }
  }

  render(){
    return html`
      <h1 color="blue">${this.answer_user}: ${this.answer_text}</h1>`

  }
}

customElements.define('component-answer', Answer);
