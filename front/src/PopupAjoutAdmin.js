import React, { useState } from 'react';
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function PopupAjoutAdmin() {

    const [showAdmin, setShowAdmin] = useState(false);

    const handleCloseAdmin = () => {
        setShowAdmin(false);
        setMess("")
        setErr("")
        setErrAdmin({})
        setAdmin({
            pseudo: "",
            validationmdp : "",
            mdp: "",
            role: "admin"
        })
    }

    const handleShowAdmin = () => setShowAdmin(true);


    const [admin, setAdmin] = useState({
        pseudo: "",
        mdp: "",
        validationmdp : "",
        role: "admin"
    })


    const [errAdmin, setErrAdmin] = useState({
        pseudo: "",
        validationmdp : "",
        mdp: "",
    })


    const [mess, setMess] = useState("")
    const [err, setErr] = useState("")



    const handleChangeAdmin = (e) => {
        console.log("handleChange")
        setAdmin({
            ...admin,
            [e.target.name]: e.target.value
        })
    }


    const ajouterAdmin = async (e) => {
        e.preventDefault()
        console.log("ajouter admin")
        console.log("admin = " + JSON.stringify(admin))

        try {

            const head = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(admin)
            };

            const res = await axios.post('/creer_utilisateur_version_admin',
                admin, head);

            if (res.data.res) {
                setMess(res.data.mess)
                setErr("")
                setErrAdmin({})
                setAdmin({})
                handleCloseAdmin()
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

            <a href="#" class="btn btn-success" onClick={handleShowAdmin} >+ admin</a>

            <Modal show={showAdmin} onHide={handleCloseAdmin}>
                <Modal.Header closeButton>
                    <Modal.Title>Creer administrateur</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form>
                        <div class="form-group">
                            <label for="inputEmail3" class="col-form-label">identifiant</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" name="pseudo" value={admin.pseudo} onChange={handleChangeAdmin} />
                                <td style={{ color: 'red' }}>{errAdmin.pseudo}</td>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="inputEmail3" class="col-form-label">mot de passe</label>
                            <div class="col-sm-10">
                                <input type="password" class="form-control" name="mdp" value={admin.mdp} onChange={handleChangeAdmin} />
                                <td style={{ color: 'red' }}>{errAdmin.mdp}</td>
                            </div>
                        </div>


                        <div class="form-group">
                            <label for="inputEmail3" class="col-form-label">validation du mot de passe </label>
                            <div class="col-sm-10">
                                <input type="password" class="form-control" name="validationmdp" value={admin.validationmdp} onChange={handleChangeAdmin} />
                                <td style={{ color: 'red' }}>{errAdmin.validationmdp}</td>
                            </div>
                        </div>

                        <div style={{ color: 'green' }}>{mess}</div>
                        <div style={{ color: 'red' }}>{err}</div>

                    </form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAdmin}>
                        Fermer
                    </Button>
                    <Button variant="primary" onClick={ajouterAdmin}>
                        Valider
                    </Button>
                </Modal.Footer>
            </Modal>





        </div>
    );
}

export default PopupAjoutAdmin;