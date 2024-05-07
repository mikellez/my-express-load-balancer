const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Replace this secret key with a strong, unique key.
const secretKey = 'your_secret_key';

app.use(bodyParser.json());

// API endpoint for generating JWT tokens
app.post('/generate-token', (req, res) => {
  const user = { id: 1, username: 'user123' };
  const token = jwt.sign(user, secretKey);
  res.json({ token });
});

// API endpoint that requires JWT authentication
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Protected data', port: process.env.NAME });
});

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }
    req.user = user;
    next();
  });
}

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});