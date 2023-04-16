import React, { useState } from 'react';
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function PopupValidationInscription({ identifiant }) {

    const [sortie_utilisateur, setSortieUtilisateur] = useState({
        pseudo : sessionStorage.getItem("pseudo"),
        idSortie: identifiant,
    });



    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [err, setErr] = useState("")

    const inscription = async (e) => {
        e.preventDefault()
        console.log("inscription à la sortie sortie")
        console.log("ids = " + sortie_utilisateur)

        const head = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sortie_utilisateur)
        };

        const res = await axios.post('/inscription_sortie', sortie_utilisateur, head );

        if (res.data.res) {
            handleClose();
        } else {
            setErr(res.data.mess)
        }
    }


    return (
        <>
            <a href="#" class="btn btn-primary mx-1" onClick={handleShow} >S'inscrire</a>                

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    Valider l'inscription ?

                    <div style={{ color: 'red' }}>{err}</div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fermer
                    </Button>
                    <Button variant="primary" onClick={inscription}>
                        Valider
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PopupValidationInscription;