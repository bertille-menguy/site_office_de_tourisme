import axios from 'axios'
import React, { useState } from "react";

function CreationCompte() {

    const [membre, setMembre] = useState({
        pseudo: "",
        mdp: "",
        validationmdp: "",
        role: "membre",
    })

    const [errMembre, setErrMembre] = useState({
        pseudo: "",
        mdp: "",
        validationmdp: "",
    })

    const [mess, setMess] = useState("")
    const [err, setErr] = useState("")

    const handleChange = (e) => {
        console.log("handleChange")
        setMembre({
            ...membre,
            [e.target.name]: e.target.value
        })
    }

    const creation_compte = async (e) => {
        e.preventDefault()
        console.log("creation_compte")
        console.log("membre = " + JSON.stringify(membre))

        try {

            const head = {
                headers: {
                    'Content-Type': 'application/json'
                },
            };

            const res = await axios.post('/creer_utilisateur_version_utilisateur',
                membre, head);

            if (res.data.res) {
                setMess(res.data.mess)
                setErr("")
                setErrMembre({}) // champs formulaire réinitialisés
                setMembre({
                    pseudo: "",
                    mdp: "",
                    validationmdp: "",
                    role: "membre"
                }) // champs formulaire réinitialisés

                // memorisation du token
                sessionStorage.setItem("token", res.data.token)
                sessionStorage.setItem("role", res.data.role)
                sessionStorage.setItem("pseudo", res.data.pseudo)

                window.location.href = '/';


            }
            else {
                setMess("")
                setErr(res.data.mess)
            }
        } catch (err) {
            console.log("Erreure connexion json err : " + JSON.stringify(err))
            console.log("Erreur connexion : " + err.response.data)
        }
    }

    return (

        <div class="col-sm-6">
            <div class="card text-white bg-info mb-3" >
                <div class="card-body">
                    <h5 class="card-title text-center">Creer un compte</h5>
                    <form onSubmit={(e) => creation_compte(e)}>



                        <div class="form-group">
                            <label for="inputEmail3" class="col-form-label">identifiant</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" name="pseudo" value={membre.pseudo} onChange={handleChange} />
                                <td style={{ color: 'red' }}>{errMembre.pseudo}</td>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="inputEmail3" class="col-form-label">mot de passe</label>
                            <div class="col-sm-10">
                                <input type="password" class="form-control" name="mdp" value={membre.mdp} onChange={handleChange} />
                                <td style={{ color: 'red' }}>{errMembre.mdp}</td>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="inputEmail3" class="col-form-label">validation du mot de passe </label>
                            <div class="col-sm-10">
                                <input type="password" class="form-control" name="validationmdp" value={membre.validationmdp} onChange={handleChange} />
                                <td style={{ color: 'red' }}>{errMembre.validationmdp}</td>
                            </div>
                        </div>

                        <div style={{ color: 'green' }}>{mess}</div>
                        <div style={{ color: 'red' }}>{err}</div>

                        <div class="d-flex justify-content-center mt-4">
                            <button class="btn btn-light start ">Valider</button>
                        </div>

                    </form>
                </div>
            </div>
            <br />
        </div>
    )
}

export default CreationCompte;
