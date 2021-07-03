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
        padding:5px;

      }
      .right{
      margin-left: 20px;
      width: 95%;
      
      }
      .question-layout{
      padding-left: 35px;
      margin-top: 8px;
      margin-bottom: 8px;
      }
      .robot{
      border-left: 5px solid #41e21999;
      background-color: #f4f4f4;
      font: italic;
      
      }
      
      .notRobot{
      border-left: 5px solid #ffbc00;
      }
      
      .hidden{
        display: none;
      }
      
      .show{
        show;
      }
    `;
  }


  render(){
    return html`
    
    <vaadin-horizontal-layout class="question-layout">
    <vaadin-vertical-layout class="left">
    <img src="../../images/avatars/robot.svg" class=${this.chooseClass(this.isRobot)}>
    </vaadin-vertical-layout>
    <vaadin-vertical-layout class=${this.selectClass(this.isRobot)}>
    <h3 class="user">${this.answer_user}</h3>
    <h3 class="question_text"> ${this.answer_text}</h3>
    </vaadin-vertical-layout>
    </vaadin-horizontal-layout>

   `

  }

  selectClass(isRobot) {
    // human: #ffbc00
    // robot: #41e21999
    return (isRobot) ? 'robot right' : 'notRobot right';
  }

  chooseClass(isRobot) {
    return (isRobot) ? 'show' : 'hidden';
  }
}

customElements.define('component-answer', Answer);
