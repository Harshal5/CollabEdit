const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { loginRequired, ensureCorrectUser } = require('./middleware/auth') 
const errorHandler = require('./middleware/errorHandler');
const Doc = require("./models/Doc.model");
const cors = require('cors');

const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io').listen(server);

// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

const db = require("./config").mongoURI;

mongoose.connect(db,{ useNewUrlParser: true ,useUnifiedTopology: true, useCreateIndex: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));
mongoose.set("useFindAndModify", false);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('message', (value) => {
    // if(error) return callback(error);
    console.log(value);
    
    socket.broadcast.emit('updatemessage', value);
  });
});

const loginRouter = require('./routes/api/login');
const registerRouter = require('./routes/api/register'); 
const docsRouter = require('./routes/api/docs');
// const homeRouter = require('./routes/api/home');

app.use('/api/', loginRouter);
app.use('/api/', registerRouter);
// app.use('/api/docs', loginRequired, homeRouter);
app.use('/api/users/:id/docs', loginRequired, docsRouter);
// app.use('/api/users/:id/docs', loginRequired, ensureCorrectUser, docsRouter);       //Dont Forget to use when adding users to a document

app.get("/api/docs/", loginRequired, async (req, res, next) => {
  try {
      // console.log("in");
      let docs = await Doc.find({})
        .sort({ createdAt: "desc" })
        .populate("user", {
          name: true,
          email: true
        });
      // console.log(docs);
      
      return res.status(200).json(docs);
  } catch (err) {
      return next(err);
  }

});

app.get('/api/docs/:doc_id/', async (req, res, next) => {
  try {
    // console.log("found doc");
    let doc = await Doc.findById(req.params.doc_id);
    return res.status(200).json(doc);
  } catch (err) {
    console.log("doc not found");
    return next(err);
  }
});

app.post('/api/docs/:doc_id/', async (req, res, next) => {
  try {
    console.log("IN update");
    let doc = await Doc.updateOne({"_id":req.params.doc_id}, 
      {$set : {
        text : req.body.text
      }}
    );
    return res.status(200).json(doc);
    
  }catch (err) {
    console.log("Update fail");
    return next(err);
  }
});


// app.use(function(req, res, next){
//   let err = new Error("Not Found");
//   err.status = 404;
//   next(err);
// });

app.use(errorHandler);

const port = 5000;

server.listen(port, () => console.log(`Server up and running on port ${port} !`));