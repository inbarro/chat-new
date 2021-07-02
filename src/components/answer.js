import { html, css } from 'lit';
import { PageElement } from '../helpers/page-element';
import { LitElement } from './base';


export class Answer extends LitElement {
  static get properties() {
    return {
      answer_user: String,
      answer_text: String
    }
  }

  static get styles() {
    return css`
      .robot { color: blue; }
      .notRobot { color: green }
    `;
  }

  render(){
    return html`
      <h1 class=${this.selectClass(this.isRobot)}>${this.answer_user}: ${this.answer_text}</h1>`

  }

  selectClass(isRobot) {
    return (isRobot) ? 'robot' : 'notRobot';
  }
}

customElements.define('component-answer', Answer);
