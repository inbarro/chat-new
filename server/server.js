const io = require('socket.io')(3000);
const users = {};
const elasticsearch = require('elasticsearch');
const Client = new elasticsearch.Client({ host: 'localhost:9200' });
const  googleIt = require('google-it')

const avatarNum = 10;

async function google_it(query)
{
googleIt({'query': query}).then(results => {
  const x = 1;
  return results;
}).catch(e => {
  // any possible errors that might have occurred (like no Internet connection)
})
}

// let res = google_it('covfefe irony')
// const x = 1;

async function reset_database() {
  const indexes = ["users", "questions", "answers"];
  for (idx in indexes) {
    let index = indexes[idx];
    Client.deleteByQuery({
      index: index,
      body: {
      query: {
        match_all: {}
      }
    }
  }, function (error, response) {
      if (!error) {
        console.log(response);
      }
      if (error) {
        console.log(error);
      }
    });
  }
}

async function Populate_Data() {
  reset_database();
  // Populate users
  const users = [{ 'name': "yr", 'avatar': 2}, { 'name': "inb" , 'avatar': 3}];
  for (let idx in users) {
    let user = users[idx];
    await Client.index({
        index: 'users',
        type: "_doc",
        body: user
      }, function(err, resp, status) {
        if (!err) {
          // console.log(resp);
        }
        if (err) {
          // console.log(err);
        }
      }
    );
  }


  // Populate questions
  const questions = [{ question: "Who", user: "yr" }, { question: "Why", user: "inb" }];
  let questions_id = [];
  for (let idx in questions) {
    let question = questions[idx];
    await Client.index({
        index: 'questions',
        type: "_doc",
        body: question
      }, function(err, resp, status) {
        if (!err) {
          // console.log(resp);
          questions_id.push(resp._id);
          // console.log(questions_id);
        }
        if (err) {
          // console.log(err);
        }
      }
    )
  }

  // Populate answers
  while (questions_id.length < 2)
  {
    await new Promise(r => setTimeout(r, 1000));

  }
  const answers = [{question_id: questions_id[0], answer_text: "because", answer_user: "inb"},
                    {question_id: questions_id[1], answer_text: "good", answer_user: "yr"}];
  for (let idx in answers) {
    let answer = answers[idx];
    Client.index({
        index: 'answers',
        type: "_doc",
        body: answer
      }, function(err, resp, status) {
        if (!err) {
          // console.log(resp);
        }
        if (err) {
          // console.log(err);
        }
      }
    );
  }
}

Populate_Data();

function getRandomInt() {
  return Math.floor(Math.random() * avatarNum);
}

io.on('connection', socket => {
  socket.on('new-user', name => {
    // users[socket.id] = name;
    let avatar= getRandomInt();
    let new_user = { 'name': name, 'avatar':avatar };
    Client.index({
        index: 'users',
        type: 'mytype',
        id: socket.id,
        body: new_user
      });
    socket.broadcast.emit('user-connected', new_user);
    socket.emit('user-connected', new_user);
  });

  socket.on('search-similar-questions', query => {
    Client.search({
        index: "questions",
      body: {
        query: {
          more_like_this: {
            fields: ["question"],
            like: query,
            min_term_freq: 1,
            min_doc_freq: 1
          }
        }
      }
    }.then(
      console.log("jk")
    ))
  });


  socket.on('new-question', object => {

    Client.index({
      index: 'questions',
      type: "_doc",
      body: {question: object.question, user: object.user.name }
    }, function(err, resp, status) {
      if (!err) {
        object.question_id = resp._id;
        Client.search({
          index: "questions",
          type: "_doc",
          body: {
            query: {
              more_like_this: {
                fields: ["question"],
                like: object.question,
                min_term_freq: 1,
                min_doc_freq: 1
              }
            }
          }
        },function (err, resp, status){
          if (!err) {
            if (resp.hits.hits[0]) {
              object.similarQuestion = resp.hits.hits[0]._id;
              Client.search({
                index: 'answers',
                body: {
                  query: {
                    match: {
                      question_id: object.similarQuestion
                    }
                  }
                }
              },function (err, resp, status) {
                if (!err) {
                  // console.log(resp);

                  if (resp.hits.hits.length > 0)
                  {
                    let hit = resp.hits.hits
                    object.answers = [hit[0]._source]
                    object.answers[0].isRobot = true
                  }
                  else {
                    object.answers = []
                  }
                  socket.broadcast.emit('new_question-posted', object);
                  socket.emit('new_question-posted', object);
                }
                if(err){
                  { console.log(err);}
                }
                });

              // socket.broadcast.emit('new_question-posted', object);
              // socket.emit('new_question-posted', object);
            }
            else{
              // socket.broadcast.emit('new_question-posted', object);
              // socket.emit('new_question-posted', object);
            }



          }
          if (err)
          { console.log(err);}
        })
      }
      if (err) {
        console.log(err);
      }})});


  socket.on('new-answer', answer => {
    Client.index({
      index: 'answers',
      type: "_doc",
      body: answer
    }, function (err, resp, status) {
        if (!err) {
          answer.id = resp._id;
          answer.isRobot = false;
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

