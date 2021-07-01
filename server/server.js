const io = require('socket.io')(3000);
const users = {};
const elasticsearch = require('elasticsearch');
const Client = new elasticsearch.Client({ host: 'localhost:9200' });

// TODO: 1. Convert the message to question in terms of front (not ui), back and DB - DONE!
//       2. Change the message in the UI to make it look like a question
//       3. Add option to answer a question (add a button in the ui first) - maybe write a new tag <Q&A> </Q&A>
//       4. Add the backend part of receiving the answer to that question
//       5. Add the DB part of answers (add them to the table of questions)
//       6. Change the UI to show question and answer.
//       7. Try and Catch for DB
//       8. Next stuff later:
//         1) Robot that add answer if the question was asked before
//         2) Find similar using elasticsearch
//         3) Add a header (nice looking one)
//         4) Add a like button and show answer by likes
//         5) Make the robot show use results from google
//         6) Prompt when entering the chat: The robot speaks and he says welcome or something like that
//         7) Add some animation and other impressive UI things
//         8) change panda array in page-chat to be an object so the search for a question will be smarter


io.on('connection', socket => {
  socket.on('new-user', name => {
    users[socket.id] = name;
      Client.index({
        index: 'users',
        type: 'mytype',
        id: socket.id,
        body: { 'name': name }
      });
    socket.broadcast.emit('user-connected', name);
  });


  socket.on('search-similar-questions', question => {
    "query":
    {
    
    }

  }

  socket.on('new-question', object => {
    Client.index({
      index: 'questions',
      type: "_doc",
      body: object
    }, function (err, resp, status){
      if (!err) {
        object.question_id = resp._id;
        socket.broadcast.emit('new_question-posted', object);
        socket.emit('new_question-posted', object);
      }
      if (err)
      {
        console.log(err);
      }
    });
  });

  socket.on('new-answer', answer => {
    Client.index({
      index: 'answers',
      type: "_doc",
      body: answer
    }, function (err, resp, status) {
        if (!err) {
          answer.id = resp._id;
          socket.broadcast.emit('new_answer-posted', answer);
          socket.emit('new_answer-posted', answer);
        }
      if (err)
      {
        console.log(err);
      }
      }
    );
  });


  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
});

