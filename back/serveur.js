const express = require('express') // chargement du module express
const config = require("./config.js") // chargement de la configuration
const base = config.base
const port_http = config.port_http
const private_key = config.private_key
const jwt = require('jsonwebtoken')
const http = require("http");
const axios = require('axios')
const multer = require('multer')
const path = require('path')


var app = express();
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true }))


var server = app.listen(port_http, function () {
    console.log('Express server listening on port ' + port_http)
});


/* ------ SORTIE ------ */

// lister les sorties
app.post("/lister_sorties", function (req, res) {
    http.get("http://localhost:8080/sortie/read", (resp) => {
        let data = "";
        resp.on("data", (chunk) => {
            data += chunk;
        });
        resp.on("end", () => {
            res.send({ res: true, data: JSON.parse(data) })
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
        res.send({ res: false })
    });
})



// ajouter sortie
app.post("/ajouter_sortie",function (req, res) {
    console.log("POST sortie")
    console.log(req.body.image);

    elementSortieValide(req.body).then((valide) => {

        if (valide) {
            axios.post("http://localhost:8080/sortie/create/option/" + req.body.idOption, {
                nom: req.body.nom,
                date: req.body.date,
                lieu: req.body.lieu,
                nomImage : req.body.image,
                prix : req.body.prix,
            })
                .then(
                    res.send({ res: true, mess: "Sortie ajoutée" })
                )
                .catch((err) => {
                    console.log("Error: " + err.message)
                    res.send({ res: false, mess: "Erreur" })
                });
        } else {
            res.send({ res: false, mess: "Veuillez remplir tous les champs" })
        }
    });
})

// vérification des éléments
async function elementSortieValide(sortie) {
    const promise = new Promise((resolve, reject) => {
        if (sortie.nom == "" || sortie.lieu == "" || sortie.date == "" || sortie.idOption =="" || sortie.image =="") {
            resolve(false)
        } else {
            resolve(true)
        }
    });
    return await promise; //Attend que la promesse soit résolue ou rejetée
}



// supprimer sortie
app.post("/supprimer_sortie", function (req, res) {
    console.log("DELETE sortie")
    console.log(req.body.data);
    axios.delete('http://localhost:8080/sortie/delete/' + req.body.data)
        .then(
            res.send({ res: true })
        )
        .catch(error => {
            console.error('There was an error!', error);
            res.send({ res: false, mess: "Connexion impossible" })
        });
})


// modifier sortie
app.post("/modifier_sortie", function (req, res) {
    console.log("PUT sortie")
    console.log(req.body);
    axios.put('http://localhost:8080/sortie/update/' + req.body.id + '/option/' + req.body.idOption, {
        nom: req.body.nom,
        date: req.body.date,
        lieu: req.body.lieu,
        prix : req.body.prix,
        nomImage : req.body.nomImage
    })
        .then(
            res.send({ res: true })
        )
        .catch(error => {
            console.error('There was an error!', error);
            res.send({ res: false, mess: "Connexion impossible" })
        });
})


// s'inscrire à une sortie 
app.post("/inscription_sortie", function (req, res) {
    console.log("PUT sortie à l'utilisateur")
    console.log(req.body);
    axios.put('http://localhost:8080/utilisateur/' + req.body.pseudo + '/ajouter_sortie/' + req.body.idSortie)
        .then(
            res.send({ res: true })
        )
        .catch(error => {
            console.error('There was an error!', error);
            res.send({ res: false, mess: "Connexion impossible" })
        });
})


// s'inscrire à une sortie 
app.post("/ajouter_panier", function (req, res) {
    console.log("PUT panier")
    console.log(req.body);
    axios.put('http://localhost:8080/utilisateur/' + req.body.pseudo + '/ajouter_panier/' + req.body.idSortie)
        .then(
            res.send({ res: true })
        )
        .catch(error => {
            console.error('There was an error!', error);
            res.send({ res: false, mess: "Connexion impossible" })
        });
})


// voir commentaire
app.post("/voir_commentaire", function (req, res) {
    http.get('http://localhost:8080/sortie/' + req.body.idSortie + '/commentaires/', (resp) => {
        let data = "";
        resp.on("data", (chunk) => {
            data += chunk;
        });
        resp.on("end", () => {
            res.send({ res: true, data: JSON.parse(data) })
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
        res.send({ res: false })
    });
})



// ajouter commentaires
app.post("/commentairer", function (req, res) {
    console.log("PUT commentaire sortie")
    console.log(req.body.commentaire);
    axios.put(`http://localhost:8080/sortie/` + req.body.pseudo + `/` + req.body.idSortie + `/ajouter_commentaire`, req.body.commentaire, { headers: { "Content-Type": "text/plain" } })
        .then(
            res.send({ res: true })
        )
        .catch(error => {
            console.error('There was an error!', error);
            res.send({ res: false, mess: "Connexion impossible" })
        });
})


/* -------- OPTION --------*/


// lister les options
app.post("/lister_options", function (req, res) {
    http.get("http://localhost:8080/option/read", (resp) => {
        let data = "";
        resp.on("data", (chunk) => {
            data += chunk;
        });
        resp.on("end", () => {
            res.send({ res: true, data: JSON.parse(data) })
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
        res.send({ res: false })
    });
})

// supprimer option
app.post("/supprimer_option", function (req, res) {
    console.log("DELETE option")
    console.log(req.body.data);
    axios.delete('http://localhost:8080/option/delete/' + req.body.data)
        .then(
            res.send({ res: true })
        )
        .catch(error => {
            console.error('There was an error!', error);
            res.send({ res: false, mess: "Connexion impossible" })
        });
})

// creer option
app.post("/creer_option", function (req, res) {
    console.log("POST option")
    console.log(req.body);
    axios.post("http://localhost:8080/option/create", {
        nom: req.body.nom,
    })
        .then(
            res.send({ res: true, mess: "Option ajoutée" })
        )
        .catch((err) => {
            console.log("Error: " + err.message)
            res.send({ res: false, mess: "Erreur" })
        });;
})


// modifier option
app.post("/modifier_option", function (req, res) {
    console.log("PUT option")
    console.log(req.body);
    axios.put('http://localhost:8080/option/update/' + req.body.id, {
        nom: req.body.nom,
    })
        .then(
            res.send({ res: true })
        )
        .catch(error => {
            console.error('There was an error!', error);
            res.send({ res: false, mess: "Connexion impossible" })
        });
})


/* ------ UTILISATEUR --------*/


// lister les utilisateurs
app.post("/lister_utilisateur", function (req, res) {
    http.get("http://localhost:8080/utilisateur/read", (resp) => {
        let data = "";
        resp.on("data", (chunk) => {
            data += chunk;
        });
        resp.on("end", () => {
            res.send({ res: true, data: JSON.parse(data) })
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
        res.send({ res: false })
    });
})


// supprimer utilisateur
app.post("/supprimer_utilisateur", function (req, res) {
    console.log("DELETE utilisateur")
    console.log(req.body.data);
    axios.delete('http://localhost:8080/utilisateur/delete/' + req.body.data)
        .then(
            res.send({ res: true })
        )
        .catch(error => {
            console.error('There was an error!', error);
            res.send({ res: false, mess: "Connexion impossible" })
        });
})

// lister sortie utilisateur 
app.post("/lister_sorties_utilisateur", function (req, res) {
    http.get("http://localhost:8080/utilisateur/" + req.body.pseudo + "/sorties", (resp) => {
        let data = "";
        resp.on("data", (chunk) => {
            data += chunk;
        });
        resp.on("end", () => {
            res.send({ res: true, data: JSON.parse(data) })
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
        res.send({ res: false })
    });
})


// lister sortie utilisateur 
app.post("/panier_utilisateur", function (req, res) {
    http.get("http://localhost:8080/utilisateur/" + req.body.pseudo + "/panier", (resp) => {
        let data = "";
        resp.on("data", (chunk) => {
            data += chunk;
        });
        resp.on("end", () => {
            res.send({ res: true, data: JSON.parse(data) })
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
        res.send({ res: false })
    });
})

// vider panier 
app.post("/vider_panier", function (req, res) {
    axios.put("http://localhost:8080/utilisateur/" + req.body.pseudo + "/vider_panier")
    .then(
        res.send({ res: true })
    )
    .catch(error => {
        console.error('There was an error!', error);
        res.send({ res: false, mess: "Connexion impossible" })
    });
})

// sup du panier
app.post("/supp_du_panier", function (req, res) {
    console.log("Sup du panier")
    axios.put("http://localhost:8080/utilisateur/"+ req.body.pseudo +"/supp_panier/"+req.body.idSortie)
    .then(
        res.send({ res: true })
    )
    .catch(error => {
        console.error('There was an error!', error);
        res.send({ res: false, mess: "Connexion impossible" })
    });
})



/* --- IDENTIFICATION ----*/

// identification
app.post("/identification", function (req, res) {
    console.log("POST identification")
    let ident = req.body.identifiant
    let mdp = req.body.motdepasse

    identificationValide(ident, mdp).then((valide) => {
        if (valide.res) {
            let role = valide.role
            let token = jwt.sign({
                data: {
                    ident: ident,
                    role: role,
                }
            }, private_key, { expiresIn: 60 * 60 }); // 60 minutes
            res.send({ res: true, mess: "Succès connexion", token: token, role: role, pseudo: ident })
        } else {
            res.send({ res: false, mess: "Connexion impossible" })
        }
    });
})


async function identificationValide(ident, mdp) {
    const promise = new Promise((resolve, reject) => {
        http.get("http://localhost:8080/utilisateur/get/" + ident, (rep) => {
            let data = "";
            rep.on("data", (chunk) => {
                data += chunk;
            });
            rep.on("end", () => {
                if (data && JSON.parse(data).mdp == mdp) {
                    resolve({ res: true, role: JSON.parse(data).role });
                } else {
                    resolve({ res: false });
                }
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
            reject("Error: " + err.message);
        });
    });
    return await promise; //Attend que la promesse soit résolue ou rejetée
}



/* ---- CREATION COMPTE ----- */

// creer compte version utilisateur
app.post("/creer_utilisateur_version_utilisateur", function (req, res) {
    console.log("POST utilisateur")
    console.log(req.body);

    pseudoLibre(req.body.pseudo).then((valide1) => {
        if (valide1) {

            motDePasseValide(req.body.mdp, req.body.validationmdp).then((valide2) => {
                if (valide2) {
                    var role = req.body.role
                    axios.post("http://localhost:8080/utilisateur/create", {
                        pseudo: req.body.pseudo,
                        mdp: req.body.mdp,
                        role: role
                    })
                        .then(() => {
                            let token = jwt.sign({
                                data: {
                                    ident: req.body.pseudo,
                                    role: role,
                                }
                            }, private_key, { expiresIn: 60 * 60 }); // 60 minutes
                            res.send({ res: true, mess: "Utilisateur ajouté", token: token, role: role, pseudo: req.body.pseudo })
                        })
                        .catch((err) => {
                            console.log("Error: " + err.message)
                            res.send({ res: false, mess: "Erreur" })
                        });

                } else {
                    res.send({ res: false, mess: "Mot de passe incorrecte" })
                }
            })

        } else {
            res.send({ res: false, mess: "Ce pseudo existe déjà" })
        }
    })
})

// creer compte version admin
app.post("/creer_utilisateur_version_admin", function (req, res) {
    console.log("POST utilisateur")
    console.log(req.body);

    pseudoLibre(req.body.pseudo).then((valide1) => {
        if (valide1) {
            motDePasseValide(req.body.mdp, req.body.validationmdp).then((valide2) => {
                if (valide2) {
                    axios.post("http://localhost:8080/utilisateur/create", {
                        pseudo: req.body.pseudo,
                        mdp: req.body.mdp,
                        role: req.body.role
                    })
                        .then(
                            res.send({ res: true, mess: "Utilisateur ajouté" })
                        )
                        .catch((err) => {
                            console.log("Error: " + err.message)
                            res.send({ res: false, mess: "Erreur" })
                        });
                } else {
                    res.send({ res: false, mess: "Mot de passe incorrecte" })
                }
            })
        } else {
            res.send({ res: false, mess: "Ce pseudo existe déjà" })
        }
    })

})

// vérification du pseudo
async function pseudoLibre(pseudo) {
    const promise = new Promise((resolve, reject) => {
        http.get("http://localhost:8080/utilisateur/get/" + pseudo, (rep) => {
            let data = "";
            rep.on("data", (chunk) => {
                data += chunk;
            });
            rep.on("end", () => {
                if (data) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
            reject("Error: " + err.message);
        });
    });
    return await promise; //Attend que la promesse soit résolue ou rejetée
}



// vérification du mot de passe
async function motDePasseValide(mdp, validationmdp) {
    const promise = new Promise((resolve, reject) => {
        if (mdp == "") {
            resolve(false)
        } else if (mdp === validationmdp) {
            resolve(true)
        } else {
            resolve(false)
        }
    });
    return await promise; //Attend que la promesse soit résolue ou rejetée
}

