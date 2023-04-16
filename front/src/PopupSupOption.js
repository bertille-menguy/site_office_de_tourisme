import React, { useState } from 'react';
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaBeer } from "react-icons/fa";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

function PopupSupOption({ identifiant }) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [err, setErr] = useState("")


    const supprimerOption = async (e) => {
        e.preventDefault()
        console.log("supprimer option")
        const res = await axios.post('/supprimer_option', { data: identifiant });

        if (res.data.res) {
            handleClose();
        } else {
            setErr(res.data.mess)
        }
    }

    return (
        <>
            <a href="#" class="btn btn-danger mx-1" onClick={handleShow} ><AiOutlineDelete /></a>                

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
                    <Button variant="primary" onClick={supprimerOption}>
                        Valider
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PopupSupOption;