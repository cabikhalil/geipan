var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var assert = require('assert');
//var url = 'mongodb://localhost:27017/test';

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'geipan';

exports.connexionMongo = function(callback) {
	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);
		
		assert.equal(null, err);
		callback(err, db);
	});
}

exports.findCases = function(page, pagesize, callback) {
    MongoClient.connect(url, function(err, client) {
    	    console.log("pagesize = " + pagesize);
			console.log("page = " + pagesize);
			
			var db = client.db(dbName);

			console.log("db " + db)
        if(!err){
			db.collection('cas_pub')
			.find()
            .skip(page*pagesize)
            .limit(pagesize)
            .toArray()
            .then(arr => callback(arr));
        }
        else{
            callback(-1);
        }
    });
};

exports.findCaseById = function(id, callback) {
    MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);
        if(!err) {
        	// La requete mongoDB

            let myquery = { "_id": ObjectId(id)};

            db.collection("cas_pub") 
            .findOne(myquery, function(err, data) {
            	let reponse;

                if(!err){
                    reponse = {
                    	succes: true,
                        case : data,
                        error : null,
                        msg:"Details du cas envoyés"
                    };
                } else{
                    reponse = {
                    	succes: false,
                        case : null,
                        error : err,
                        msg: "erreur lors du find"

                    };
                }
                callback(reponse);
            });
        } else {
        	let reponse = reponse = {
                    	succes: false,
                        case : null,
                        error : err,
                        msg: "erreur de connexion à la base"
                    };
            callback(reponse);
        }
    });
}

exports.createCase = function(formData, callback) {
	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);

	    if(!err) {
	 
			let toInsert = {
				name : formData.nom, 
				cuisine : formData.cuisine
			};
			console.dir(JSON.stringify(toInsert));
		    db.collection("cas_pub")
		    .insertOne(toInsert, function(err, result) {
		    	let reponse;

		        if(!err){
		            reponse = {
		                succes : true,
		                result: result,
		                error : null,
		                msg: "Ajout réussi " + result
		            };
		        } else {
		            reponse = {
		                succes : false,
		                error : err,
		                msg: "Problème à l'insertion"
		            };
		        }
		        callback(reponse);
		    });
		} else{
			let reponse = reponse = {
                    	succes: false,
                        error : err,
                        msg:"Problème lors de l'insertion, erreur de connexion."
                    };
            callback(reponse);
		}
	});
}

exports.updateCase = function(id, formData, callback) {

	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);

		if(!err) {
            let myquery = { "_id": ObjectId(id)};
	        let newvalues = {
	        	name : formData.nom, 
	        	cuisine : formData.cuisine
	        };


			db.collection("cas_pub")
			.replaceOne(myquery, newvalues, function(err, result) {
	         	if(!err){
			    	reponse = {
		                succes : true,
		                result: result,
		                error : null,
		                msg: "Modification réussie " + result
		            };
			   	} else {
		            reponse = {
		                succes : false,
		                error : err,
		                msg: "Problème à la modification"
		            };
			    }
			    callback(reponse);
	        });
		} else{
			let reponse = reponse = {
                    	succes: false,
                        error : err,
                        msg:"Problème lors de la modification, erreur de connexion."
                    };
            callback(reponse);
		}
	});
}

exports.deleteCase = function(id, callback) {
	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);

		if(!err) {
            let myquery = { "_id": ObjectId(id)};
	        
			db.collection("cas_pub")
			.deleteOne(myquery, function(err, result) {
	         	if(!err){
			    	reponse = {
		                succes : true,
		                result: result,
		                error : null,
		                msg: "Suppression réussie " + result
		            };
			   	} else {
		            reponse = {
		                succes : false,
		                error : err,
		                msg: "Problème à la suppression"
		            };
			    }
			    callback(reponse);
	        });
		} else{
			let reponse = reponse = {
                    	succes: false,
                        error : err,
                        msg:"Problème lors de la suppression, erreur de connexion."
                    };
            callback(reponse);
		}
	});
}