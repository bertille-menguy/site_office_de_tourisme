import React, { useState } from 'react';
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AiOutlineEdit } from "react-icons/ai";
import moment from 'moment';


function PopupModifierOption({ element }) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [option, setOption] = useState({
         id : element.id,
         nom: element.nom
    })

    const [err, setErr] = useState("")

    const handleChange = (e) => {
        console.log("handleChange")
        setOption({
            ...option,
            [e.target.name]: e.target.value
        })
    }


    const modifierOption= async (e) =>{
        e.preventDefault()
        console.log("modifier option")
        console.log("id = " + element.id)

        const head = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(option)
        };

        const res = await axios.post('/modifier_option', option, head);

        if (res.data.res) {
            handleClose();
        } else {
            setErr(res.data.mess)
        }
    }

    return (
        <>
            <a href="#" class="btn btn-light mx-1" onClick={handleShow} ><AiOutlineEdit /></a>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modifier option</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form>
                        <div class="form-group row">
                            <div class="col-sm-10">
                                <input type="text" class="form-control" name="nom" value={option.nom} onChange={handleChange} ></input>
                            </div>
                        </div>


                    </form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fermer
                    </Button>
                    <Button variant="primary" onClick={modifierOption}>
                        Valider
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PopupModifierOption;