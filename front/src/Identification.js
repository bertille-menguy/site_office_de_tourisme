import axios from 'axios'
import React, { useState } from "react";
import moment from 'moment';

function Identification() {

    const [membre, setMembre] = useState({
        identifiant: "",
        motdepasse: "",
    })

    const [errMembre, setErrMembre] = useState({
        identifiant: "",
        motdepasse: "",
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

    const identification = async (e) => {
        e.preventDefault()
        console.log("identification")
        console.log("membre = " + JSON.stringify(membre))

        try {

            const head = {
                headers: {
                    'Content-Type': 'application/json'
                },
            };

            const res = await axios.post('/identification',
                membre, head);

            if (res.data.res) {
                setMess(res.data.mess)
                setErr("")
                setErrMembre({}) // champs formulaire réinitialisés
                setMembre({}) // champs formulaire réinitialisés

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
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title text-center">Identification</h5>
                    <form onSubmit={(e) => identification(e)}>

                        <div class="form-group">
                            <label for="inputEmail3" class="col-form-label">identifiant</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" name="identifiant" value={membre.identifiant} onChange={handleChange} />
                                <td style={{ color: 'red' }}>{errMembre.identifiant}</td>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="inputEmail3" class="col-form-label">mot de passe</label>
                            <div class="col-sm-10">
                                <input type="password" class="form-control" name="motdepasse" value={membre.motdepasse} onChange={handleChange} />
                                <td style={{ color: 'red' }}>{errMembre.motdepasse}</td>
                            </div>
                        </div>

                        <div style={{ color: 'red' }}>{err}</div>

                        <div class="d-flex justify-content-center mt-4">
                            <button class="btn text-white btn-info start ">Valider</button>
                        </div>


                    </form>
                </div>
            </div>
            <br />



        </div>
    )
}

export default Identification;
