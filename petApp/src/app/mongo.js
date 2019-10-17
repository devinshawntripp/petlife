const Owner = require('./owners.js');
var MongoClient = require('mongodb').MongoClient;

//const obj = new Owner("Clint");
//console.log(clint._name);
//var collection = db.collection('petApp');//tours is the collection in the learning_mongo database
var url = 'mongodb://localhost:27017/petApp';//learning_mongo is the name of the database
var y = "Clint";
var passwrd = "12345";
var l =6000;
var myObj = { Name: y, Password: passwrd};

var findDocuments = function(db, callback) { //Works
    var collection = db.collection('petApp');//tours is the collection in the learning_mongo database
    var obj = new Owner(y);
    
    //below is getting a object to store the name in the database, including "name", similar to a PROJECTION.
    collection.find({Name: y}, {"Name":1, _id:0}).toArray(function(err, docs){
    //collection.find({"Name": { $regex: /[aur]/g}}, {"Name":1, _id:0}).toArray(function(err, docs){
      obj._name = docs;
      console.log(obj._name);
    })
  }

  var insertDocument = function(db, callback){

      var collection = db.collection('petApp');//tours is the collection in the learning_mongo database
      collection.insert(myObj, function(err, res){
      if (err) throw err;
      console.log("1 document inserted");


  })
}

  var deleteDocument = function(db, callback){
    //deleting a document from the database
    var collection = db.collection('petApp');//tours is the collection in the learning_mongo database
    collection.deleteOne(myObj, function(err, docs){
        if(err) throw err;
        console.log("1 document deleted");
    })
  }


  var updateDocument = function(db, callback){
    //updating a document
    var collection = db.collection('petApp');//tours is the collection in the learning_mongo database
    var upDate = { $set: {Level:9000}};
    collection.updateOne(myObj, upDate, function(err, res){
    if(err) throw err;
    console.log("1 document updated");
    })
  }


/* special find case
    //console.log(clint._name);
    collection.find({"Level":{$gt:1000}}).toArray(function(err, docs) { //finds all documents with levels > 1000
        console.log(docs);//
        //callback;
    })

}
*/

MongoClient.connect(url, function(err, db) {
    console.log("Connected successfully to server");
    db.createCollection('petApp', function(err, collection) {});
      /*findDocuments(db, function () {

    })*/
    insertDocument(db, function(){ //works

    })

})
