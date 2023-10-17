const express = require("express");
const bodyParser = require("body-parser");
const ejs = require('ejs');


const app = express();
app.set('view engine', 'ejs');
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true }));

let newtaskArray = [];

app.get('/', (req,res) => {
    let date = { weekday: 'long', month: 'long', day: 'numeric' };
    let today  = new Date();
    let day = today.toLocaleDateString("en-US", date);
    res.render('index', {dayType:day,newlistItem:newtaskArray});
});

app.post('/',(req,res) => {
     let newTask = req.body.newItem;
     newtaskArray.push(newTask);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});

// nodemon 
