const path = require('path');
const express = require('express');
const app = express();
const mongoose = require( "mongoose" );
const passport = require("passport")
const passportLocalMongoose = require("passport-local-mongoose")

mongoose.connect( "mongodb://localhost:27017/test", { useNewUrlParser: true, useUnifiedTopology: true});


const userSchema = new mongoose.Schema ({
    user:   String,
    email:      String,
    password:   String,
    phone:      String
});

const Users = mongoose.model ("Users", userSchema);

const ToDoSchema = new mongoose.Schema ({
    text:   String,
    state:   String,
    user:    String,
    isTaskDone: Boolean, 
    isTaskCleared: Boolean
});

const ToDo = mongoose.model ("Tasks", ToDoSchema);

passport.use(Users.createStrategy());
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());

app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render(`${__dirname}/public/index`);
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    let userId = '';
    User.findOne({ email }).select('+password')
        .then((user) => {
            if (!user) {
                console.log('User not found');
            }
            userId = user._id;
            return password == user.password;
        })
        .then((matched) => {
            if (!matched) {
                console.log('Password does not match');
            }
        })
});

app.get("/logout",(req,res)=>{
    currentUser = null;
    res.redirect("/");
});

app.post("/register", (req, res) => {
    let exists = false;
    
    let users = require('./public/login.json');

    var user = req.body["auth-usr-name"];
    var email = req.body["auth-usr-email"];
    var password = req.body["auth-usr-password"];
    var phone = req.body["auth-usr-phone"];

    for(var i = 0; i < users.length; i++)
    {
        if(user == users[i].username)
        {
            exists = true;
            res.redirect("/");
            break;
        }
    }
    if(!exists)
    {
        users.push({"user": user, "password": password});
        var fs = require('fs')
        Users.register({username, email, password, phone}, password, (err, user) => {   
            if (err) {
                console.log(err);
                res.redirect("/");
            } else {
                passport.authenticate("local")(req, res, () => {
                req.session.user = user;
            });
        }
        res.redirect("/todo");
    });
    }
    
    res.redirect("/");

});

app.get('/todo', (req, res) => {
    res.render(`${__dirname}/public/todo`);
});

app.post("/addtask",(req,res)=>{
    let tasks = require('./public/todo.json');
    let task = req.body["task"];
    tasks.push({"task": task});
    var fs = require('fs')
    fs.writeFile('./public/todo.json', JSON.stringify(tasks), (err) => {
        if (err) console.log(err);
    });
    res.redirect("/todo");
});

app.post("/claim",(req,res)=>{
    let tasks = require('./public/todo.json');
    let task = req.body["task"];
    for(var i = 0; i < tasks.length; i++)
    {
        if(task == tasks[i].task)
        {
            tasks[i].claimed = true;
            break;
        }
    }
    var fs = require('fs')
    fs.writeFile('./public/todo.json', JSON.stringify(tasks), (err) => {
        if (err) console.log(err);
    });
    res.redirect("/todo");
});

app.listen(3000, () => {
    console.log('Application listening on port 3000!');
});
