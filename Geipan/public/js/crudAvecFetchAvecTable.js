// REQUETES GET
function getRequest1() {
	let url = "/api/cases";

	fetch(url)
		.then(function(responseJSON) {
        	responseJSON.json()
        	.then(function(res) {
        		// Maintenant res est un vrai objet JavaScript
        		afficheReponseGET(res);
        	});
    	})
    	.catch(function (err) {
        	console.log(err);
    });
}

function getRequest2() {
    let url = "/api/cases?page=2";

    fetch(url)
        .then(function(responseJSON) {
            responseJSON.json()
            .then(function(res) {
                // Maintenant res est un vrai objet JavaScript
                afficheReponseGET(res);
            });
        })
        .catch(function (err) {
            console.log(err);
    });
}

function getRequest3() {
    let url = "/api/cases?page=2&pagesize=20";

    fetch(url)
        .then(function(responseJSON) {
            responseJSON.json()
            .then(function(res) {
                // Maintenant res est un vrai objet JavaScript
                afficheReponseGET(res);
            });
        })
        .catch(function (err) {
            console.log(err);
    });
}

function getRequest4() {
    let url = "/api/cases/2";

    fetch(url)
        .then(function(responseJSON) {
            responseJSON.json()
            .then(function(res) {
                // Maintenant res est un vrai objet JavaScript
                afficheReponseGET(res);
            });
        })
        .catch(function (err) {
            console.log(err);
    });
}

// REQUETES POST
function postRequest(event) {
    // Pour éviter que la page ne se ré-affiche
    event.preventDefault();

    // Récupération du formulaire. Pas besoin de document.querySelector
    // ou document.getElementById puisque c'est le formulaire qui a généré
    // l'événement
    let form = event.target;

    // Récupération des valeurs des champs du formulaire
    // en prévision d'un envoi multipart en ajax/fetch
    let donneesFormulaire = new FormData(form);

    let url = "/api/cases";

    fetch(url, {
        method: "POST",
        body: donneesFormulaire
    })
    .then(function(responseJSON) {
        responseJSON.json()
            .then(function(res) {
                // Maintenant res est un vrai objet JavaScript
                afficheReponsePOST(res);
            });
        })
        .catch(function (err) {
            console.log(err);
    });
}

// REQUETES PUT
function putRequest(event) {
    // Pour éviter que la page ne se ré-affiche
    event.preventDefault();

    // Récupération du formulaire. Pas besoin de document.querySelector
    // ou document.getElementById puisque c'est le formulaire qui a généré
    // l'événement
    let form = event.target;
    // Récupération des valeurs des champs du formulaire
    // en prévision d'un envoi multipart en ajax/fetch
    let donneesFormulaire = new FormData(event.target);

    let id = form.id_cas.value; // on peut aller chercher la valeur
                             // d'un champs d'un formulaire
                             // comme cela, si on connait le nom
                             // du champ (valeur de son attribut name)

    let url = "/api/cases/" + id;

    fetch(url, {
        method: "PUT",
        body: donneesFormulaire
    })
    .then(function(responseJSON) {
        responseJSON.json()
            .then(function(res) {
                // Maintenant res est un vrai objet JavaScript
                afficheReponsePUT(res);
            });
        })
        .catch(function (err) {
            console.log(err);
    });
}

// REQUETES DELETE
function deleteRequest(event) {
    // Pour éviter que la page ne se ré-affiche
    event.preventDefault();

    // Récupération du formulaire. Pas besoin de document.querySelector
    // ou document.getElementById puisque c'est le formulaire qui a généré
    // l'événement
    let form = event.target;
 
    let id = form.id_cas.value; // on peut aller chercher la valeur
                             // d'un champs d'un formulaire
                             // comme cela, si on connait le nom
                             // du champ (valeur de son attribut name)

    envoieRequeteFetchDelete(id);
}

function envoieRequeteFetchDelete(id) {
    let url = "/api/cases/" + id;

    fetch(url, {
        method: "DELETE",
    })
    .then(function(responseJSON) {
        responseJSON.json()
            .then(function(res) {
                // Maintenant res est un vrai objet JavaScript
                afficheReponseDELETE(res);
            });
        })
        .catch(function (err) {
            console.log(err);
    });
}
//-------------------------------
// Affichage d'une réponse JSON
function afficheReponseGET(reponse) {
    let div = document.querySelector("#reponseGET");
    div.innerHTML = reponse.msg;

    // Dans reponse.data j'ai les cases
    afficheCasesEnTable(reponse.data);
}

function afficheReponsePOST(reponse) {
    let div = document.querySelector("#reponsePOST");
    div.innerHTML = reponse.msg;
}

function afficheReponsePUT(reponse) {
    let div = document.querySelector("#reponsePUT");
    div.innerHTML = reponse.msg;

    // On affiche le tableau à jour
    getRequest1();
}

function afficheReponseDELETE(reponse) {
    let div = document.querySelector("#reponseDELETE");
    div.innerHTML = reponse.msg;
}

//------------ ici fonction pour creer tableau
function afficheCasesEnTable(cases) {
    console.log("creer tableau");

    // On cree un tableau
    let table = document.createElement("table");

    // Je cree une ligne
    for(var i=0; i < cases.length; i++) {
        let ligne = table.insertRow();
        ligne.id = "case" + i;

        let cas = cases[i];
        let nom = cas.name;
        let zone = cas.zone;

        let celluleNom = ligne.insertCell();
        celluleNom.innerHTML = nom;
        celluleNom.id = "case" + i + "Nom" ;

        let celluleZone = ligne.insertCell();
        celluleZone.innerHTML = zone;
        celluleZone.id = "case" + i + "Zone" ;

        let celluleRemove = ligne.insertCell();
        celluleRemove.innerHTML = '<button id=' + cas.id_cas + ' onclick="supprimerCase(event);">Supprimer</button>';

        let celluleModifier = ligne.insertCell();
        celluleModifier.innerHTML = '<button id=' + cas.id_cas + ' onclick="modifierCase(' + i + ');">Modifier</button>';

        /*
        ligne.innerHTML = "<td>" + nom + "</td><td>"    
                            + zone + "</td>"; 
                            */
    }

    let divTable = document.querySelector("#reponseGET");
    divTable.innerHTML = "";

    // on ajoute le tableau au div
    divTable.appendChild(table);
}

function supprimerCase(event) {
    var id = event.target.id;
    console.log("on supprime le cas id=" + id);

    envoieRequeteFetchDelete(id)

    // On affiche le tableau à jour
    getRequest1();
}

function modifierCase(noLigne) {
    let id = event.target.id;

    let nom = document.querySelector("#cas" + noLigne + "Nom").textContent;
    let zone = document.querySelector("#cas" + noLigne + "Zone").textContent;

    console.log("modifier Case id=" + id + "avec nom="+nom + " zone= "+ zone);

    // On remplit le formulaire
    let form = document.querySelector("#formulaireModification");
    form.nom.value = nom;
    form.zone.value = zone;
    form.id_cas.value = id;



}



 // REQUETES GET
function getRequest1() {
	let url = "/api/testimonials";

	fetch(url)
		.then(function(responseJSON) {
        	responseJSON.json()
        	.then(function(res) {
        		// Maintenant res est un vrai objet JavaScript
        		afficheReponseGET(res);
        	});
    	})
    	.catch(function (err) {
        	console.log(err);
    });
}

function getRequest2() {
    let url = "/api/testimonials?page=2";

    fetch(url)
        .then(function(responseJSON) {
            responseJSON.json()
            .then(function(res) {
                // Maintenant res est un vrai objet JavaScript
                afficheReponseGET(res);
            });
        })
        .catch(function (err) {
            console.log(err);
    });
}

function getRequest3() {
    let url = "/api/testimonials?page=2&pagesize=20";

    fetch(url)
        .then(function(responseJSON) {
            responseJSON.json()
            .then(function(res) {
                // Maintenant res est un vrai objet JavaScript
                afficheReponseGET(res);
            });
        })
        .catch(function (err) {
            console.log(err);
    });
}

function getRequest4() {
    let url = "/api/testimonials/31";

    fetch(url)
        .then(function(responseJSON) {
            responseJSON.json()
            .then(function(res) {
                // Maintenant res est un vrai objet JavaScript
                afficheReponseGET(res);
            });
        })
        .catch(function (err) {
            console.log(err);
    });
}

// REQUETES POST
function postRequest(event) {
    // Pour éviter que la page ne se ré-affiche
    event.preventDefault();

    // Récupération du formulaire. Pas besoin de document.querySelector
    // ou document.getElementById puisque c'est le formulaire qui a généré
    // l'événement
    let form = event.target;

    // Récupération des valeurs des champs du formulaire
    // en prévision d'un envoi multipart en ajax/fetch
    let donneesFormulaire = new FormData(form);

    let url = "/api/testimonials";

    fetch(url, {
        method: "POST",
        body: donneesFormulaire
    })
    .then(function(responseJSON) {
        responseJSON.json()
            .then(function(res) {
                // Maintenant res est un vrai objet JavaScript
                afficheReponsePOST(res);
            });
        })
        .catch(function (err) {
            console.log(err);
    });
}

// REQUETES PUT
function putRequest(event) {
    // Pour éviter que la page ne se ré-affiche
    event.preventDefault();

    // Récupération du formulaire. Pas besoin de document.querySelector
    // ou document.getElementById puisque c'est le formulaire qui a généré
    // l'événement
    let form = event.target;
    // Récupération des valeurs des champs du formulaire
    // en prévision d'un envoi multipart en ajax/fetch
    let donneesFormulaire = new FormData(event.target);

    let id = form.id_temoignage.value; // on peut aller chercher la valeur
                             // d'un champs d'un formulaire
                             // comme cela, si on connait le nom
                             // du champ (valeur de son attribut name)

    let url = "/api/testimonials/" + id;

    fetch(url, {
        method: "PUT",
        body: donneesFormulaire
    })
    .then(function(responseJSON) {
        responseJSON.json()
            .then(function(res) {
                // Maintenant res est un vrai objet JavaScript
                afficheReponsePUT(res);
            });
        })
        .catch(function (err) {
            console.log(err);
    });
}

// REQUETES DELETE
function deleteRequest(event) {
    // Pour éviter que la page ne se ré-affiche
    event.preventDefault();

    // Récupération du formulaire. Pas besoin de document.querySelector
    // ou document.getElementById puisque c'est le formulaire qui a généré
    // l'événement
    let form = event.target;
 
    let id = form.id_temoignage.value; // on peut aller chercher la valeur
                             // d'un champs d'un formulaire
                             // comme cela, si on connait le nom
                             // du champ (valeur de son attribut name)

    envoieRequeteFetchDelete(id);
}

function envoieRequeteFetchDelete(id) {
    let url = "/api/testimonials/" + id;

    fetch(url, {
        method: "DELETE",
    })
    .then(function(responseJSON) {
        responseJSON.json()
            .then(function(res) {
                // Maintenant res est un vrai objet JavaScript
                afficheReponseDELETE(res);
            });
        })
        .catch(function (err) {
            console.log(err);
    });
}
//-------------------------------
// Affichage d'une réponse JSON
function afficheReponseGET(reponse) {
    let div = document.querySelector("#reponseGET");
    div.innerHTML = reponse.msg;

    // Dans reponse.data j'ai les testimonials
    afficheTestimonialsEnTable(reponse.data);
}

function afficheReponsePOST(reponse) {
    let div = document.querySelector("#reponsePOST");
    div.innerHTML = reponse.msg;
}

function afficheReponsePUT(reponse) {
    let div = document.querySelector("#reponsePUT");
    div.innerHTML = reponse.msg;

    // On affiche le tableau à jour
    getRequest1();
}

function afficheReponseDELETE(reponse) {
    let div = document.querySelector("#reponseDELETE");
    div.innerHTML = reponse.msg;
}

//------------ ici fonction pour creer tableau
function afficheCasesEnTable(testimonials) {
    console.log("creer tableau");

    // On cree un tableau
    let table = document.createElement("table");

    // Je cree une ligne
    for(var i=0; i < testimonials.length; i++) {
        let ligne = table.insertRow();
        ligne.id = "case" + i;

        let testimonial = testimonials[i];
        let nom = testimonial.tem_nom_dossier;
        let genre = testimonial.tem_genre;

        let celluleNom = ligne.insertCell();
        celluleNom.innerHTML = nom;
        celluleNom.id = "testimonial" + i + "Nom" ;

        let celluleGenre = ligne.insertCell();
        celluleGenre.innerHTML = genre;
        celluleGenre.id = "testimonial" + i + "Genre" ;

        let celluleRemove = ligne.insertCell();
        celluleRemove.innerHTML = '<button id=' + testimonial.id_temoignage + ' onclick="supprimerTestimonial(event);">Supprimer</button>';

        let celluleModifier = ligne.insertCell();
        celluleModifier.innerHTML = '<button id=' + testimonial.id_temoignage + ' onclick="modifierTestimonial(' + i + ');">Modifier</button>';

        /*
        ligne.innerHTML = "<td>" + nom + "</td><td>"    
                            + zone + "</td>"; 
                            */
    }

    let divTable = document.querySelector("#reponseGET");
    divTable.innerHTML = "";

    // on ajoute le tableau au div
    divTable.appendChild(table);
}

function supprimerTestimonial(event) {
    var id = event.target.id;
    console.log("on supprime le cas id=" + id);

    envoieRequeteFetchDelete(id)

    // On affiche le tableau à jour
    getRequest1();
}

function modifierTestimonial(noLigne) {
    let id = event.target.id;

    let nom = document.querySelector("#testimonial" + noLigne + "Nom").textContent;
    let genre = document.querySelector("#testimonial" + noLigne + "Genre").textContent;

    console.log("modifier Testimonial id=" + id + "avec nom="+nom + " genre= "+ genre);

    // On remplit le formulaire
    let form = document.querySelector("#formulaireModification");
    form.tem_nom_dossier.value = nom;
    form.tem_genre.value = genre;
    form.id_temoignage.value = id;



}




















