const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', require('./src/controllers'));

// Fallback route
app.use('*', (req, res) => {
    res.status(404).json({
        error: "Path not found"
    });
})

app.listen(8080, () => console.log('App started on port 8080 🚀'));