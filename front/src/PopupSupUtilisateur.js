import React, { useState } from 'react';
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AiOutlineDelete } from "react-icons/ai";

function PopupSupUtilisateur({ identifiant }) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [err, setErr] = useState("")

    const supprimerUtilisateur = async (e) => {
        e.preventDefault()
        console.log("supprimer utilisateur")
        const res = await axios.post('/supprimer_utilisateur', { data: identifiant });

        if (res.data.res) {
            handleClose();
        } else {
            setErr(res.data.mess)
        }
    }

    return (
        <>
            <a class="btn btn-danger mx-1" onClick={handleShow} ><AiOutlineDelete /></a>                

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    Souhaitez-vous supprimer cet élément ?

                    <div style={{ color: 'red' }}>{err}</div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fermer
                    </Button>
                    <Button variant="primary" onClick={supprimerUtilisateur}>
                        Valider
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PopupSupUtilisateur;