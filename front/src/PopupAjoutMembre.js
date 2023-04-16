import React, { useState } from 'react';
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function PopupAjoutMembre() {

    const [showMembre, setShowMembre] = useState(false);
    const [showAdmin, setShowAdmin] = useState(false);


    const handleCloseMembre = () => {
        setShowMembre(false);
    }
    
    const handleShowMembre = () => setShowMembre(true);


    const [membre, setMembre] = useState({
        pseudo: "",
        mdp: "",
        validationmdp: "",
        role: "membre"
    })

    const [errMembre, setErrMembre] = useState({
        pseudo: "",
        mdp: "",
        validationmdp:"",
    })

    const [mess, setMess] = useState("")
    const [err, setErr] = useState("")

    const handleChangeMembre = (e) => {
        console.log("handleChange")
        setMembre({
            ...membre,
            [e.target.name]: e.target.value
        })
    }


    const ajouterMembre = async (e) => {
        e.preventDefault()
        console.log("ajouter membre")
        console.log("membre = " + JSON.stringify(membre))

        try {

            const head = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(membre)
            };

            const res = await axios.post('/creer_utilisateur_version_admin',
                membre, head);

            if (res.data.res) {
                setMess(res.data.mess)
                setErr("")
                setErrMembre({})
                setMembre({})
                handleCloseMembre()
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
        <div>

            <a href="#" class="btn btn-success me-2" onClick={handleShowMembre}>+ membre</a>

            <Modal show={showMembre} onHide={handleCloseMembre}>
                <Modal.Header closeButton>
                    <Modal.Title>Creer membre</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form>
                        <div class="form-group">
                            <label for="inputEmail3" class="col-form-label">identifiant</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" name="pseudo" value={membre.pseudo} onChange={handleChangeMembre} />
                                <td style={{ color: 'red' }}>{errMembre.pseudo}</td>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="inputEmail3" class="col-form-label">mot de passe</label>
                            <div class="col-sm-10">
                                <input type="password" class="form-control" name="mdp" value={membre.mdp} onChange={handleChangeMembre} />
                                <td style={{ color: 'red' }}>{errMembre.mdp}</td>
                            </div>
                        </div>


                        <div class="form-group">
                            <label for="inputEmail3" class="col-form-label">validation du mot de passe </label>
                            <div class="col-sm-10">
                                <input type="password" class="form-control" name="validationmdp" value={membre.validationmdp} onChange={handleChangeMembre} />
                                <td style={{ color: 'red' }}>{errMembre.validationmdp}</td>
                            </div>
                        </div>

                        <div style={{ color: 'green' }}>{mess}</div>
                        <div style={{ color: 'red' }}>{err}</div>

                    </form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseMembre}>
                        Fermer
                    </Button>
                    <Button variant="primary" onClick={ajouterMembre}>
                        Valider
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}

export default PopupAjoutMembre;