const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const db = require("./config").mongoURI;

mongoose.connect(db,{ useNewUrlParser: true ,useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));
mongoose.set("useFindAndModify", false);

const loginRouter = require('./routes/api/login');
const registerRouter = require('./routes/api/register'); 

app.use('/api/', loginRouter);
app.use('/api/', registerRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));