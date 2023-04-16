import React, { useState } from 'react';
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';

function PopupAjoutOption() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [option, setOption] = useState({
        nom: "",
    })

    const [errOption, setErrOption] = useState({
        nom: "",
    })

    const [mess, setMess] = useState("")
    const [err, setErr] = useState("")

    const handleChange = (e) => {
        console.log("handleChange")
        setOption({
            ...option,
            [e.target.name]: e.target.value
        })
    }

    const ajouterOption = async (e) => {
        e.preventDefault()
        console.log("ajouter option")
        console.log("option = " + JSON.stringify(option))

        try {

            const head = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(option)
            };

            const res = await axios.post('/creer_option',
                option, head);

            if (res.data.res) {
                setMess(res.data.mess)
                setErr("")
                setErrOption({})
                setOption({})
                handleClose()
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

            <a href="#" class="btn btn-success" onClick={handleShow} >Ajouter</a>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Creer option</Modal.Title>
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
                    <Button variant="primary" onClick={ajouterOption}>
                        Valider
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default PopupAjoutOption;