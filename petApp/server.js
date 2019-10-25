/*
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongo = require('mongoose');

var db = mongo.connect("mongodb://localhost27017/crap", function(err, response){
    if(err){console.log(err);}
    else{ console.log("connected!");}
})

var app=express();
app.use(bodyParser());
app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({extended:true}));

app.use(function (req, res, next){

    res.setHandler('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHandler('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHandler('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
    res.setHandler('Access-Control-Allow-Credentials', true);
    next();
})

var Schema = mongo.Schema;

var UserSchema = new Schema({
    firstname: {type: String},
    lastname: {type: String},
    email: {type: String},
    password: {type: String}
})

var model = mongo.model('users', UserSchema, 'users');

app.post("/api/SaveUser", function(req, res){
    var mod = new model(req.body);
    if(req.body.mode =="Save")
    {
        mod.save(function(err, data){
            if(err){
                res.send(err);
            }
            else{
                res.send({data:"Record has been inserted!"});
            }
        });
    }
    else
    {
        model.findByIdAndUpdate(req.body.id, {firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, password: req.body.password}, 
            function(err, data){
                if(err){
                    res.send(err);
                }
                else{ 
                    res.send({data: "Updated scuessfully"});
                }
            });
    
    
    }
})

app.post("/api/deleteUser", function(req,res){
    model.remove({_id: req.body.id}, function(err){
        if(err){
            res.send(err);
        }
        else{
            res.send({data:"Record has been Deleted!"});
        }
    });
})



app.get("/api/getUser", function(req, res){
    model.find({}, function(err, data){
        if(err){
            res.send(err);
        }
        else{
            res.send(data);
        }
    });
})


app.listen(8080, function(){

    console.log("Example app listening on port 8080");
})
*/

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var User = require('./models/User')

var db = mongoose.connect('mongodb://localhost:27017/test', function(err, response){
    if(err) connect.log("error connecting to mongo db");
    console.log("connection has been added");
});
app.set('port', process.env.port || 3000);
app.use(bodyparser.json());

app.get('/', (req, res) =>{
    res.send("hello");
})

app.post('/register', (req, res) =>{ //will be used with registering
    var firstname = req.body.firstname;
    var lastname = req.body.lastfirstname;
    var email = req.body.email;
    var phonenumber = req.body.phonenumber;
    var password = req.body.password;

    var user = new User();
    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;
    user.phonenumber = phonenumber;
    user.password = password;

    user.save((err, result) =>{
        if(err){
            console.log("error adding user in data base");
            res.sendStatus(500);
        }
        res.sendStatus(200);
    })
})
app.listen(app.get('port'), function(err, response){
    console.log("Server is running on port ", app.get('port'));
});
