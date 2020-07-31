const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors')
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config/key");



const mongoose = require("mongoose");
const connect = mongoose.connect(config.mongoURI,
  {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/users', require('./routes/users'));
app.use('/api/favorite', require('./routes/favorite'));
app.use('/api/exercise',require('./routes/exercise'))
app.use('/api/story',require('./routes/story'))
app.use('/api/story/comment',require('./routes/comment'))






//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));

// FOR PRODUCATUION
if (process.env.NODE_ENV === "production") {
  // Exprees will serve up production assets
  app.use(express.static("../client/build"));

  // Express serve up index.html file if it doesn't recognize route
  const path = require("path");
  app.get("*", (req, res) => {
    let url = path.join(__dirname, "../client/build", "index.html");
    if (!url.startsWith("/app/"))
      // since we're on local windows
      url = url.substring(1);
    res.sendFile(url);
  });
}


const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server Listening on ${port}`)
});