const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const server = require('http').Server(app);

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");

	next();
});
// pour les formulaires multiparts
var multer = require('multer');
var multerData = multer();

const mongoDBModule = require('./app_modules/crud-mongo');

// Pour les formulaires standards
const bodyParser = require('body-parser');
// pour les formulaires multiparts
var multer = require('multer');
var multerData = multer();

// Cette ligne indique le répertoire qui contient
// les fichiers statiques: html, css, js, images etc.
app.use(express.static(__dirname + '/public'));
// Paramètres standards du modyle bodyParser
// qui sert à récupérer des paramètres reçus
// par ex, par l'envoi d'un formulaire "standard"
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//------------------
// ROUTES
//------------------
// Utile pour indiquer la home page, dans le cas
// ou il ne s'agit pas de public/index.html
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

// Ici des routes en :
// http GET (pour récupérer des données)
// http POST : pour insérer des données
// http PUT pour modifier des données
// http DELETE pour supprimer des données

//----------------------------------------------
// Ces routes forment l'API de l'application !!
//----------------------------------------------

// Test de la connexion à la base
app.get('/api/connection', function (req, res) {
	// Pour le moment on simule, mais après on devra
	// réellement se connecte à la base de données
	// et renvoyer une valeur pour dire si tout est ok
	mongoDBModule.connexionMongo(function (err, db) {
		let reponse;

		if (err) {
			console.log("erreur connexion");
			reponse = {
				msg: "erreur de connexion err=" + err
			}
		} else {
			reponse = {
				msg: "connexion établie"
			}
		}
		res.send(JSON.stringify(reponse));

	});
});

// On va récupérer des cases par un GET (standard REST) 
// cette fonction d'API peut accepter des paramètres
// pagesize = nombre de cases par page
// page = no de la page
// Oui, on va faire de la pagination, pour afficher
// par exemple les cases 10 par 10
app.get('/api/filteredcases', function (req, res) {
	// Si présent on prend la valeur du param, sinon 1
	let page = parseInt(req.query.page || 0);
	// idem si present on prend la valeur, sinon 10
	let pagesize = parseInt(req.query.pagesize || 10);
	console.log("*****");
	console.log(req.query);
	console.log("*****");
	let form = {}
	if (req.query.cas_date_start == undefined && req.query.cas_date_end == undefined) {
		form = {
			cas_date_start: req.query.cas_date_start,
			cas_date_end: req.query.cas_date_end,
			cas_classification: req.query.cas_classification,
			cas_zone_nom: req.query.cas_zone_nom
		}
	}
	else if (req.query.cas_date_start == undefined) {
		form = {
			cas_date_start: req.query.cas_date_start,
			cas_date_end: new Date(req.query.cas_date_end),
			cas_classification: req.query.cas_classification,
			cas_zone_nom: req.query.cas_zone_nom
		}
	}
	else if (req.query.cas_date_end == undefined) {
		form = {
			cas_date_start: new Date(req.query.cas_date_start),
			cas_date_end: req.query.cas_date_end,
			cas_classification: req.query.cas_classification,
			cas_zone_nom: req.query.cas_zone_nom
		}
	}
	else {
		form = {
			cas_date_start: new Date(req.query.cas_date_start),
			cas_date_end: new Date(req.query.cas_date_end),
			cas_classification: req.query.cas_classification,
			cas_zone_nom: req.query.cas_zone_nom
		}
	}

	console.log(form);
mongoDBModule.findFilteredCases(form, page, pagesize, function (data) {
	var objdData = {
		msg: "filteredcases recherchés avec succès",
		data: data
	}
	res.send(JSON.stringify(objdData));
}); 
});

///////////////////////////cases////////////////////////
 app.get('/api/cases', function(req, res) { 
	// Si présent on prend la valeur du param, sinon 1
    let page = parseInt(req.query.page || 0);
    // idem si present on prend la valeur, sinon 10
    let pagesize = parseInt(req.query.pagesize || 10);

 	mongoDBModule.findCases(page, pagesize, function(data,count) {
 		var objdData = {
 			msg:"cases recherchés avec succès",
			data: data,
			count: count
 		}
 		res.send(JSON.stringify(objdData)); 
 	}); 
});  

// Récupération d'un seul case par son id
app.get('/api/cases/:id', function (req, res) {
	var id = req.params.id;

	mongoDBModule.findCaseById(id, function (data) {
		res.send(JSON.stringify(data));
	});

});

// Creation d'un case par envoi d'un formulaire
// On fera l'insert par un POST, c'est le standard REST
app.post('/api/cases', multerData.fields([]), function (req, res) {
	// On supposera qu'on ajoutera un case en 
	// donnant son nom et sa zone. On va donc 
	// recuperer les données du formulaire d'envoi
	// les params sont dans req.body même si le formulaire
	// est envoyé en multipart

	mongoDBModule.createCase(req.body, function (data) {
		res.send(JSON.stringify(data));
	});
});

// Modification d'un case, on fera l'update par
// une requête http PUT, c'est le standard REST
app.put('/api/cases/:id', multerData.fields([]), function (req, res) {
	var id = req.params.id;

	mongoDBModule.updateCase(id, req.body, function (data) {
		res.send(JSON.stringify(data));
	});
});

// Suppression d'un case
// On fera la suppression par une requête http DELETE
// c'est le standard REST
app.delete('/api/cases/:id', function (req, res) {
	var id = req.params.id;

	mongoDBModule.deleteCase(id, function (data) {
		res.send(JSON.stringify(data));
	});
})


///////////////////////////testimonials////////////////////////
app.get('/api/testimonials', function (req, res) {
	// Si présent on prend la valeur du param, sinon 1
	let page = parseInt(req.query.page || 0);
	// idem si present on prend la valeur, sinon 10
	let pagesize = parseInt(req.query.pagesize || 10);

	mongoDBModule.findTestimonials(page, pagesize, function (data) {
		var objdData = {
			msg: "testimonials recherchés avec succès",
			data: data
		}
		res.send(JSON.stringify(objdData));
	});
});

// Récupération d'un seul testimonial par son id
app.get('/api/testimonials/:id', function (req, res) {
	var id = req.params.id;

	mongoDBModule.findTestimonialById(id, function (data) {
		res.send(JSON.stringify(data));
	});

});

app.get('/api/testimonials/byCase/:id', function (req, res) {
	var id = req.params.id;

	mongoDBModule.findTestimonialByCasId(id, function (data) {
		res.send(JSON.stringify(data));
	})
})

// Creation d'un testimonial par envoi d'un formulaire
// On fera l'insert par un POST, c'est le standard REST
app.post('/api/testimonials', multerData.fields([]), function (req, res) {
	// On supposera qu'on ajoutera un testimonial en 
	// donnant son nom et son genre. On va donc 
	// recuperer les données du formulaire d'envoi
	// les params sont dans req.body même si le formulaire
	// est envoyé en multipart

	mongoDBModule.createTestimonial(req.body, function (data) {
		res.send(JSON.stringify(data));
	});
});

// Modification d'un testimonial, on fera l'update par
// une requête http PUT, c'est le standard REST
app.put('/api/testimonials/:id', multerData.fields([]), function (req, res) {
	var id = req.params.id;

	mongoDBModule.updateTestimonial(id, req.body, function (data) {
		res.send(JSON.stringify(data));
	});
});

// Suppression d'un testimonial
// On fera la suppression par une requête http DELETE
// c'est le standard REST
app.delete('/api/testimonials/:id', function (req, res) {
	var id = req.params.id;

	mongoDBModule.deleteTestimonial(id, function (data) {
		res.send(JSON.stringify(data));
	});
})

// Lance le serveur avec express
server.listen(port);

console.log("Serveur lancé sur le port : " + port);