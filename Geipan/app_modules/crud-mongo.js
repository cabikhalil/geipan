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

exports.findFilteredCases = function(form,page, pagesize, callback) {
    MongoClient.connect(url, function(err, client) {
    	    console.log("pagesize = " + pagesize);
			console.log("page = " + page);
			
			var db = client.db(dbName);

			console.log("db " + db)
		if (form.cas_classification == "A"){
			console.log("Classe A")
		}
		console.log("****************************NEW QUERY************************************")
		let finalquery = {};
		if(form.cas_classification !== undefined) {
			console.log("Longueur CAS_CLASSIFICATION ="+form.cas_classification.length)
			if (form.cas_classification.length>1){
				let cas_classif= form.cas_classification.split(',');
				let queryClasse = ""
				queryClasse = cas_classif.length == 0?{$exist:true}:{$in:cas_classif};
				
				console.log("Query zone : " + JSON.stringify(queryClasse))
				finalquery["cas_classification"]=queryClasse;
				
			} else {
				finalquery["cas_classification"]=form.cas_classification;
				console.log("Final query in classe " + JSON.stringify(finalquery));
			}
		}
		
		if(form.cas_zone_nom !== undefined) {
			if (JSON.stringify(form.cas_zone_nom).includes(',')){
				let cas_zone= form.cas_zone_nom.split(',');
				let queryZone = ""
				queryZone = cas_zone.length == 0?{$exist:true}:{$in:cas_zone};
				//queryZone = {$in:cas_zone}
				console.log("Query zone : " + JSON.stringify(queryZone))
				finalquery["cas_zone_nom"]=queryZone;
				
			} else {
				finalquery["cas_zone_nom"]=form.cas_zone_nom;
				console.log("form cas zone nom : " + JSON.stringify(form.cas_zone_nom))
				console.log("Final query in zone " + JSON.stringify(finalquery))
			}
		}

		if(form.cas_date_start !== undefined && form.cas_date_end!== undefined){

			let queryDatePeriod = ""
			queryDatePeriod = (form.cas_date_end.length == 0 && form.cas_date_start.length == 0) ?{$exist:true}:{$gte:form.cas_date_start, $lte : form.cas_date_end};
			finalquery["dateCas"]=queryDatePeriod;
			console.log("Query DatePeriod: "+JSON.stringify(queryDatePeriod))
			
		} else if (form.cas_date_start !== undefined && form.cas_date_end== undefined ) {
			
			let queryDateStart = ""
			queryDateStart = (form.cas_date_start.length == 0) ?{$exist:true}:{$gte:form.cas_date_start};
			finalquery["dateCas"]=queryDateStart;
			console.log("Query DateStart : "+JSON.stringify(queryDateStart))
			
		} else if (form.cas_date_end !== undefined && form.cas_date_start == undefined) {
			
			let queryDateEnd = ""
			queryDateEnd = (form.cas_date_end.length == 0) ?{$exist:true}:{$lte:form.cas_date_end};
			finalquery["dateCas"]=queryDateEnd;
			console.log("Query DateEnd"+JSON.stringify(queryDateEnd))
		}
		console.log ("FINAL QUERY BEFORE AGGREGATE : "+ JSON.stringify(finalquery))
		
        if(!err){
			db.collection('cas_pub').aggregate(
				[{$addFields: { dateCas : {$dateFromParts: { 'year' : {$convert:{input: "$cas_AAAA", to:"int", onError:2005}} , 'month' : {$convert:{input: "$cas_MM", to:"int", onError:01}}, 'day': {$convert:{input: "$cas_JJ", to:"int", onError:01}} }}}}, { $match : finalquery }, {$skip:page*pagesize} ]
			)
			//db.collection('cas_pub')
			//.find(finalquery)
            //.skip(page*pagesize)
           // .limit(pagesize)
            .toArray()
			.then(arr =>
				{console.log("Array aggregate :");
				console.log(arr.length);
				callback(arr)}
				);
        }
        else{
            callback(-1);
        }
    });
};

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
            //.limit(pagesize)
            .toArray()
            .then(arr => {
				db.collection('cas_pub')
				.count()
				.then(rep => callback(arr,rep))
			});
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

            let myquery = { "id_cas": parseInt(id)};
			console.log(id);
            db.collection("cas_pub") 
            .findOne(myquery, function(err, data) {
				let reponse;
				console.log(data);

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
				name : formData.cas_nom_dossier, 
				zone : formData.cas_zone_nom
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
            let myquery = { "id_cas": id};
	        let newvalues = {
	        	name : formData.cas_nom_dossier, 
	        	zone : formData.cas_zone_nom
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
            let myquery = { "id_cas": id};
	        
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




exports.findTestimonials = function(page, pagesize, callback) {
    MongoClient.connect(url, function(err, client) {
    	    console.log("pagesize = " + pagesize);
			console.log("page = " + pagesize);
			
			var db = client.db(dbName);

			console.log("db " + db)
        if(!err){
			db.collection('temoignages_pub')
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

exports.findTestimonialById = function(id, callback) {
    MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);
        if(!err) {
        	// La requete mongoDB

            let myquery = { "id_temoignage": parseInt(id)};

            db.collection("temoignages_pub") 
            .findOne(myquery, function(err, data) {
            	let reponse;

                if(!err){
                    reponse = {
                    	succes: true,
                        case : data,
                        error : null,
                        msg:"Details du temoignage envoyés"
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

exports.findTestimonialByCasId = function(id, callback) {
    MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);
        if(!err) {
        	// La requete mongoDB

            let myquery = { "id_cas": parseInt(id)};

            /*db.collection("temoignages_pub") 
			.find(myquery, function(err, data) {*/
				db.collection("temoignages_pub").find(myquery).toArray(function (err, data) {
            	let reponse;

                if(!err){
                    reponse = {
                    	succes: true,
                        case : data,
                        error : null,
                        msg:"Details du temoignage envoyés"
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

exports.createTestimonial = function(formData, callback) {
	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);

	    if(!err) {
	 
			let toInsert = {
				name : formData.tem_nom_dossier, 
				genre : formData.tem_genre
			};
			console.dir(JSON.stringify(toInsert));
		    db.collection("temoignages_pub")
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
			let reponse = {
                    	succes: false,
                        error : err,
                        msg:"Problème lors de l'insertion, erreur de connexion."
                    };
            callback(reponse);
		}
	});
}

exports.updateTestimonial = function(id, formData, callback) {

	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);

		if(!err) {
            let myquery = { "id_cas": id};
	        let newvalues = {
	        	name : formData.tem_nom_dossier, 
	        	genre : formData.tem_genre
	        };


			db.collection("temoignages_pub")
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

exports.deleteTestimonial = function(id, callback) {
	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);

		if(!err) {
            let myquery = { "id_cas": id};
	        
			db.collection("temoignages_pub")
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