const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { loginRequired, ensureCorrectUser } = require('./middleware/auth') 

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

app.use('/api/', loginRouter);
app.use('/api/', registerRouter);

app.get('/api/message', loginRequired, ensureCorrectUser, (req, res) => {
  console.log('hii');
  
  return res.json("hii");
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));