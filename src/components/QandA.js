import { html } from 'lit';
import { css } from 'lit-element'

import { PageElement } from '../helpers/page-element';
const socket = io('http://localhost:3000', { transports: ['websocket', 'polling', 'flashsocket'] });
import '@polymer/iron-icon/iron-icon.js';
import '@vaadin/vaadin-icons/vaadin-icons.js';
import { Answer} from '../components/answer';


export class QandA extends PageElement {

  static get properties() {
    return {
      question: Object,
      answers: Array,
      curr_answer: String,
      socket: Object,
      answer_user: Object
    }
  }

  constructor(){
    super();
    this.curr_answer = '';
  }

  shortcutListener(e) {
    if (e.key === 'Enter') {
      // this.askNewQuestion();
    }
  }
  updateCurrAnswer(e) {
    this.curr_answer = e.target.value;
  }

  addNewAnswer(){
    socket.emit("new-answer", {question_id: this.question.question_id, answer_text: this.curr_answer, answer_user: this.answer_user.name});

  }

  static get styles() {
    return css`
    .input-layout{ 
     margin-left: 100px;
    }
   
    `}

  render(){
    return html `
    <div class="q&a">
      <component-question class="question" .user=${this.question.user} .question=${this.question.question}></component-question>
      <div class="answers">
      ${this.answers.map(answer => html`<component-answer .isRobot=${answer.isRobot} .answer_user=${answer.answer_user} .answer_text=${answer.answer_text}></component-answer>`)}
      </div>
       <div style= "margin: 20px 20px 20px 110px; border-radius: 50px;" class="input-layout">
        <vaadin-text-field style="width: 40%;
        height: 100px;"
      placeholder="answer..."
      @change = "${this.updateCurrAnswer}"
      value="${this.curr_answer}">
        </vaadin-text-field>
        <iron-icon icon="vaadin:chevron-circle-right" style="color: #0e0f2a; margin: 7px" @click="${this.addNewAnswer}">
      </iron-icon>
      </div>
     </div>
`}

}

customElements.define('component-qanda', QandA);

