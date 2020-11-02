const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const sslHeroku = require('heroku-ssl-redirect');

const app = express();
app.use(
    fileUpload({
        createParentPath: true,
    })
);
const router = express.Router();
app.use(
    bodyParser.json({
        type: ['application/json', 'text/plain'],
    })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sslHeroku());

app.post('/upload', async function (req, res) {
    const file = req.files.file;
    const pathFile = __dirname + '\\uploads\\' + file.name;
    
    await file.mv(pathFile);

    const buf = fs.readFileSync(pathFile, (err) => {
        if (err) console.log(err);
    });

    const data = buf.toString();
    console.log(data);
    res.send({state: data});
    fs.unlink(pathFile, (err) => {
      if(err){
        console.log(err);
      }
      else{
        console.log(pathFile + ' was deleted');
      }
    });
    
});
app.listen(process.env.PORT || 3000);

app.use(express.static(__dirname + './../public'));
app.use('/', (req, res) => {
    res.sendFile(path.resolve(__dirname));
});
