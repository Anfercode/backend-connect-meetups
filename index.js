const express = require('express');
const app = express();

const { config } = require('./src/config');
const connectMeetups = require('./src/routes/index');

app.get('/', (req, res) => {
  let userInfo = req.header("user-agent");
  res.send(`UserInfo: ${userInfo}`);
});

app.use(express.json());

connectMeetups(app);

app.listen(config.port, err => {
  if (err) {
    console.error("Error: ", err);
    return;
  }
  console.log(`Listening http://localhost:${config.port}`);
});