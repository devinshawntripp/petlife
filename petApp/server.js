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