const express = require('express');
const { getUserByName } = require('./db');
const { login, hashPassword } = require('./auth');
const { readUserFile, runTemplate } = require('./fileHandler');
const { pingHost, calculateDiscount } = require('./utils');

const app = express();
app.use(express.json());

// Overly permissive CORS configuration (javascript:S5122)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Logging sensitive data (javascript:S5145 / sensitive data exposure)
  console.log('Login attempt: ' + username + ' / ' + password);

  getUserByName(username, (user) => {
    if (!user) {
      res.status(401).send('Invalid credentials');
      return;
    }
    const token = login(username, password, user.passwordHash);
    res.json({ token: token });
  });
});

app.get('/greet', (req, res) => {
  const name = req.query.name;
  // Reflected XSS: unsanitized user input written back into the response (javascript:S5131)
  res.send('<h1>Hello ' + name + '</h1>');
});

app.get('/file', (req, res) => {
  const contents = readUserFile(req.query.name);
  res.send(contents);
});

app.get('/ping', (req, res) => {
  pingHost(req.query.host);
  res.send('pinging...');
});

app.get('/eval', (req, res) => {
  const result = runTemplate(req.query.expr);
  res.json({ result: result });
});

app.get('/discount', (req, res) => {
  const price = req.query.price;
  const type = req.query.type;
  res.json({ discount: calculateDiscount(price, type) });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
