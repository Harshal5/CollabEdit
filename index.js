const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { loginRequired, ensureCorrectUser } = require('./middleware/auth') 
const errorHandler = require('./middleware/errorHandler');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const db = require("./config").mongoURI;

mongoose.connect(db,{ useNewUrlParser: true ,useUnifiedTopology: true, useCreateIndex: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));
mongoose.set("useFindAndModify", false);

const loginRouter = require('./routes/api/login');
const registerRouter = require('./routes/api/register'); 
const docsRouter = require('./routes/api/docs');
const homeRouter = require('./routes/api/home');

app.use('/api/', loginRouter);
app.use('/api/', registerRouter);
app.use('/api/docs', loginRequired, homeRouter);
app.use('/api/users/:id/docs', loginRequired, ensureCorrectUser, docsRouter);

app.get('/api/message', loginRequired, ensureCorrectUser, (req, res) => {
  console.log('hii');
  
  return res.json("hii");
});


app.use(function(req, res, next){
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));