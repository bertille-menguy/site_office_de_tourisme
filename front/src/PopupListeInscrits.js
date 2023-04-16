import React, { useState } from 'react';
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AiOutlineEdit } from "react-icons/ai";
import moment from 'moment';


function PopupListeInscrits({ liste }) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <>
            <p class="" ><a href="#" onClick={handleShow} >voir : <strong>{liste.length}</strong> personne(s) inscrite(s)</a></p>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Personnes inscrites</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul class="list-group list-group-flush">
                        {
                            liste.map( (p) =>{
                                return <li class="list-group-item">{p.pseudo}</li>
                            })
                        }
                    </ul>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default PopupListeInscrits;