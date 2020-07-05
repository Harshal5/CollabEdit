const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { loginRequired, ensureCorrectUser } = require('./middleware/auth') 
const errorHandler = require('./middleware/errorHandler');
const Doc = require("./models/Doc.model");
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
// const homeRouter = require('./routes/api/home');

app.use('/api/', loginRouter);
app.use('/api/', registerRouter);
// app.use('/api/docs', loginRequired, homeRouter);
app.use('/api/users/:id/docs', loginRequired, ensureCorrectUser, docsRouter);

app.get("/api/docs/", loginRequired, async (req, res, next) => {
  try {
      console.log("in");
      let docs = await Doc.find({})
        .sort({ createdAt: "desc" })
        .populate("user", {
          username: true,
          email: true
        });
      
      return res.status(200).json(docs);
  } catch (err) {
      return next(err);
  }

});

app.get('/api/docs/:doc_id/', async (req, res, next) => {
  try {
    console.log("found doc");
    let doc = await Doc.findById(req.params.doc_id);
    return res.status(200).json(doc);
  } catch (err) {
    console.log("doc not found");
    return next(err);
  }
});

app.use(function(req, res, next){
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));