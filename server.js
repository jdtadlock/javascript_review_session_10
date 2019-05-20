const express = require('express'); // <--- Object Constructor
const path = require('path'); // built into Node
const PORT = process.env.PORT || 5000; // 892847282

const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'review_10'
});

// const test = undefined || 0 || null || false || '' || 3;

// console.log(__dirname); // /Users/jdtadlock/teaching/js_review/review_10

const app = express(); // new express() is being called behind the scenes for you

// Tells Express to give the browser access to anything inside public
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true })); // Allow Objects and Arrays in form data
app.use(express.json()); // Attach form data to req.body

// app.get('/something', (req, res) => {
//   res.send('adfadfadsfasf');
// })

// ROUTES
// Initial Route ---- Route URL
// View route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

// Listening for jQuery to visit /notes
// API Route
app.get('/api/notes', (req, res) => {
  db.query('SELECT * FROM notes', (err, data) => {
    res.send(data);
  });
});

app.post('/api/notes', (req, res) => {
  db.query('INSERT INTO notes SET title=?, body=?',
    [req.body.title, req.body.body],
    (err, result) => {
      if (err) throw err;

      res.send({ success: 'true!' });
    })
});

db.connect((err) => {
  if (err) throw err;

  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
});










// REST API
// Routes
// Reading / Writing to DB in Express
// Handlebars

