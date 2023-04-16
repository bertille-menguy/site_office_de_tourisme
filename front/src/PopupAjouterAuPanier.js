import React, { useState } from 'react';
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function PopupAjouterAuPanier({ identifiant }) {

    const [sortie_utilisateur, setSortieUtilisateur] = useState({
        pseudo : sessionStorage.getItem("pseudo"),
        idSortie: identifiant,
    });

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [err, setErr] = useState("")

    const valider = async (e) => {
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

        const res = await axios.post('/ajouter_panier', sortie_utilisateur, head );

        if (res.data.res) {
            handleClose();
        } else {
            setErr(res.data.mess)
        }
    }


    return (
        <>
            <a href="#" class="btn btn-primary mx-1" onClick={handleShow} >Ajouter au panier</a>                

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    Souhaitez-vous ajouter cette sortie à votre panier?

                    <div style={{ color: 'red' }}>{err}</div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fermer
                    </Button>
                    <Button variant="primary" onClick={valider}>
                        Valider
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PopupAjouterAuPanier;