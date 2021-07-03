import { html, css } from 'lit';
import { PageElement } from '../helpers/page-element';
import { LitElement } from './base';
import '@vaadin/vaadin-ordered-layout'

export class Question extends LitElement {

  static get properties() {
    return {
      question: String,
    }
  }

  constructor(){
    super();
    this.question = "";
  }

  static get styles() {
    return css`
      .user {
        margin: 4px;
        padding-left: 15px;
        font-family: 'Roboto', sans-serif;
         }
       .question_text
       {
       margin: 4px;
       padding-left: 15px;
       font-family: 'Roboto Condensed', sans-serif;
       font-size: 14px;
       color: #878787;
       }
      .left {
        width: 5%;
        height: 50px;

      }
      .right{
      width: 95%;
      }
      .question-layout{
      padding-left: 35px;
      }
     
    `;
  }

  render(){
    return html`
    <vaadin-horizontal-layout class="question-layout">
    <vaadin-vertical-layout class="left">
    <img src="../../images/avatars/${this.user.avatar}.svg" alt="no avatar">
    </vaadin-vertical-layout>
    <vaadin-vertical-layout class="right">
    <div> <h3 class="user">${this.user.name}</h3>
    <h3 class="question_text"> ${this.question}</h3>
    </div>
    </vaadin-vertical-layout>
    </vaadin-horizontal-layout>
`
  }
}

customElements.define('component-question', Question);

