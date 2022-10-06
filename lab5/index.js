const path = require('path');
const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render(`${__dirname}/public/index`);
});

app.get('/todo', (req, res) => {
    res.render(`${__dirname}/public/todo`);
});

app.listen(3000, () => {
    console.log('Application listening on port 3000!');
});
