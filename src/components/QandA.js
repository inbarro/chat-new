import { html } from 'lit';
import { PageElement } from '../helpers/page-element';
const socket = io('http://localhost:3000', { transports: ['websocket', 'polling', 'flashsocket'] });
import { Answer} from '../components/answer';


export class QandA extends PageElement {

  static get properties() {
    return {
      question: Object,
      answers: Array,
      curr_answer: String,
      socket: Object,
      answer_user: String
    }
  }

  constructor(){
    super();
    this.curr_answer = '';
    // this.socket = socket

    // socket.on('new_answer-posted', object =>{
    //     this.curr_answer = ' '
    // });

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
    socket.emit("new-answer", {question_id: this.question.question_id, answer_text: this.curr_answer, answer_user: this.answer_user});

  }

  // askNewQuestion() {
  //   socket.emit("new-question", {question: this.curr_question, user: this.name});
  //   this.addQuestionToChat({question: this.curr_question, answers: [{user:'server' ,text: "server_ans"}]})
  // }

  render(){
    return html `
    <component-question .question=${this.question.question}></component-question>
    ${this.answers.map(answer => html `<component-answer .answer_user=${answer.answer_user} .answer_text=${answer.answer_text}></component-answer>`)}
     <div class="input-layout">
      <vaadin-text-field
    placeholder="answer..."
    @change = "${this.updateCurrAnswer}"
    value="${this.curr_answer}">
      </vaadin-text-field>
      <vaadin-button
    theme="secondary"
  @click="${this.addNewAnswer}">
        add answer
    </vaadin-button>
    </div>
`}

}

customElements.define('component-qanda', QandA);

