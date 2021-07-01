import { html } from 'lit';
import { PageElement } from '../helpers/page-element';
import { LitElement } from '../components/base';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-checkbox';
import '@vaadin/vaadin-radio-button/vaadin-radio-button';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';
import { QandA } from '../components/QandA'

const socket = io('http://localhost:3000', { transports: ['websocket', 'polling', 'flashsocket'] });

export class Chat extends PageElement {

  // Dont know if needed
  static get properties() {
    return {
      curr_question: { type: Object },
      name: {type: String},
      qands: {type: Object},
      change_was_made: {type: Boolean}
    };
  }

  constructor() {
    super();
    // const socket = io('http://localhost:3000', { transports: ['websocket', 'polling', 'flashsocket'] });

    // Takes the names from the alert
    this.change_was_made = false;
    this.name = prompt('What is your name?');

    // New user connected
    // Socket emit - send event to the other side of the socket
    socket.emit('new-user', this.name);

    // What's inside the text box
    this.curr_question = '';
    // this.qands = [{question: {{id: "dsdsds", text:"ma tarotze?"}, answers: [{user:'ruti' ,text: "al titarev"},{user:'ruti2' ,text: "ahi?"}]}];
    this.qands = [];

    socket.on('user-connected', name => {
    });

    socket.on('user-disconnected', name => {

    });

    socket.on('new_answer-posted', object =>{
      this.addAnswerToChat(object);
      this.change_was_made = false;
      // this.req();
    });

    socket.on('new_question-posted', object => {
      this.addQuestionToChat({question: object, answers: []});
    });
  }

  askNewQuestion() {
    socket.emit("new-question", {question: this.curr_question, user: this.name});
  }

  shortcutListener(e) {
    if (e.key === 'Enter') {
      this.askNewQuestion();
    }
  }

  updateTask(e) {
    this.curr_question = e.target.value;
  }

  addQuestionToChat(obj) {
    this.qands = [...this.qands, obj];
  }

  addAnswerToChat(obj)
  {
    let ob = {};
    let ob_temp = {};
    for (let key in this.qands)
    {
      if (obj.question_id == this.qands[key].question.question_id)
      {
        this.qands[key].answers = [...this.qands[key].answers,{answer_user: obj.answer_user, answer_text: obj.answer_text}];
        // this.qands[key].answers.push({answer_user: obj.answer_user, answer_text: obj.answer_text});

      }
    }
    this.change_was_made = true;
  }

  render() {
    return html`
  ${this.qands.map(qanda => html`<component-qanda .answer_user=${this.name} .question=${qanda.question} .answers=${qanda.answers}> </component-qanda>`)}
  <div class="input-layout">
      <vaadin-text-field
      @change="${this.updateTask}"
    placeholder="Question"
    value="${this.curr_question}"
   >
      </vaadin-text-field>
      <vaadin-button
    theme="primary"
  @click="${this.askNewQuestion}">
      Ask question
    </vaadin-button>
    </div>
`
  }

}

customElements.define('component-chat', Chat);


