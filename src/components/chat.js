import { html, css } from 'lit';
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
      qands: {type: Object},
      change_was_made: {type: Boolean},
      query: {type: String},
      user: {type: Object}
    };
  }

  constructor() {
    super();
    // const socket = io('http://localhost:3000', { transports: ['websocket', 'polling', 'flashsocket'] });

    // Takes the names from the alert
    this.change_was_made = false;

    // New user connected
    // Socket emit - send event to the other side of the socket
    socket.emit('new-user', prompt('What is your name?'));
    socket.emit('initialize-data', "");

    // What's inside the text box
    this.curr_question = '';
    // this.qands = [{question: {{id: "dsdsds", text:"ma tarotze?"}, answers: [{user:'ruti' ,text: "al titarev"},{user:'ruti2' ,text: "ahi?"}]}];
    socket.on('initialize-data', res =>{
      let x = 1;
      this.qands = [res];
      this.change_was_made = true;
      this.change_was_made = false;
    })
    this.qands = [];

    socket.on('user-connected', user => {
      this.user = user;
    });

    socket.on('user-disconnected', name => {

    });

    socket.on('new_answer-posted', object =>{
      this.addAnswerToChat(object);
      this.change_was_made = false;
    });

    socket.on('new_question-posted', object => {
      this.addQuestionToChat({question: object, answers: object.answers});
      this.change_was_made = false;
    });
  }



  askNewQuestion() {
    socket.emit("new-question", {question: this.curr_question, user: this.user});
  }


  findsimilar(){
    // this.curr_question = "";
    socket.emit("search-similar-questions", this.query);
  }

  shortcutListener(e) {
    if (e.key === 'Enter') {
      this.askNewQuestion();
    }
  }

  updateTask(e) {
    this.curr_question = e.target.value;
  }

  updateTask2(e) {
    this.query = e.target.value;
  }

  addQuestionToChat(obj) {
    this.qands = [...this.qands, obj];
    this.change_was_made = true;
  }

  addAnswerToChat(obj)
  {
    for (let key in this.qands)
    {
      if (obj.question_id == this.qands[key].question.question_id)
      {
        this.qands[key].answers = [...this.qands[key].answers,{answer_user: obj.answer_user, answer_text: obj.answer_text, isRobot: obj.isRobot}];
        // this.qands[key].answers.push({answer_user: obj.answer_user, answer_text: obj.answer_text});

      }
    }
    this.change_was_made = true;
  }

  static get styles() {
    return css`
    .component-qanda{
      margin: 50px;
    }
    `}

  render() {
    return html`
<div class="container">
  ${this.qands.map(qanda => html`<component-qanda .answer_user=${this.user} .question=${qanda.question} .answers=${qanda.answers}> </component-qanda>`)}
  <div class="input-layout">
      <vaadin-text-field class="newQuestionButton"
      @change="${this.updateTask}"
    placeholder="Question"
    value="${this.curr_question}"
   >
      </vaadin-text-field>
      <vaadin-button class="newQuestionButton"
    theme="primary"
  @click="${this.askNewQuestion}">
      Ask question
    </vaadin-button>
    </div>
    </div>
`
  }

}

customElements.define('component-chat', Chat);



