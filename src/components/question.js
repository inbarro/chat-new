import { html, css } from 'lit';
import { PageElement } from '../helpers/page-element';
import { LitElement } from './base';

export class Question extends LitElement {

  static get properties() {
    return {
      question: String,
    }
  }

  constructor(){
    super();
    this.question = "ma tarotze?";
  }

  static get styles() {
    return css`
      h1 { color: red; }
    `;
  }

  render(){
    return html`
   <h1 color="green">${this.user}: ${this.question}</h1>`
  }
}

customElements.define('component-question', Question);

