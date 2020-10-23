const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(
    bodyParser.json({
        type: ['application/json', 'text/plain'],
    })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(process.env.PORT || 3000);

app.use(express.static(__dirname + './../public'));
app.use('/', (req, res) => {
    res.sendFile(path.resolve(__dirname));
})