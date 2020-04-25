const express = require('express');
const app = express();
const connectDb = require('./config/db');
const users = require('./route/api/users');
const auth = require('./route/api/auth');
var cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

app.use(express.static('public'));

connectDb();

app.use(cors());
// Init BodyParsr
app.use(express.json({ extended: false }));

app.use('/api/users', users);
app.use('/api/auth', auth);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is started on port ${PORT}`));
