import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AiOutlineEdit } from "react-icons/ai";
import moment from 'moment';


function PopupModifierSortie({ element }) {


    const [image, setImage] = useState();

    const [show, setShow] = useState(false);

    const [sortie, setSortie] = useState({
        id : element.id,
        nom: element.nom,
        date: element.date,
        lieu: element.lieu,
        prix: element.prix,
        idOption : element.choixOption.id,
        nomImage : element.nomImage
    })

    const [options, setOptions] = useState([])



    function verif() {
        try {
            setImage(<img src={require('./img/' + sortie.nomImage)} width='200' />)
            return true
        } catch (err) {
            setImage(<p style={{ color: 'red' }}>Ce nom d'image n'existe pas</p>)
            return false
        }
    }

    const handleChange = (e) => {
        console.log("handleChange")
        setSortie({
            ...sortie,
            [e.target.name]: e.target.value
        })
    }


    const [mess, setMess] = useState("")
    const [err, setErr] = useState("")

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function getDate() {
        return moment().format("YYYY-MM-DD")
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.post("./lister_options");
                setOptions(res.data.data);
                console.log(res.data.data)

            } catch (error) {
                console.error(error.message);
            }
        }
        fetchData();
        
    }, []);


    const modifierSortie = async (e) => {
        e.preventDefault()
        console.log("modifier sortie")
        console.log("id = " + element.id)
        if(verif()){
            const head = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sortie)
            };
    
            const res = await axios.post('/modifier_sortie', sortie, head );
    
            if (res.data.res) {
                handleClose();
            } else {
                setErr(res.data.mess)
            }
        }
       
    }


    return (
        <>
            <a href="#" class="btn btn-light mx-1" onClick={handleShow} ><AiOutlineEdit /></a>                

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modifier la sortie</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form>
                        <div class="form-group row">
                            <label for="inputEmail3" class="col-sm-2 col-form-label">Nom de la sortie</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" name="nom" value={sortie.nom} onChange={handleChange} ></input>
                            </div>
                        </div>



                        <div class="form-row">
                            <div class="form-group">
                                <label class="col-form-label">Date et heure</label>
                                <div class="col">
                                    <input type="datetime-local" min={getDate()} max="2030-12-31" class="form-control" name="date" value={sortie.date} onChange={handleChange}></input>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-form-label">Prix € </label>
                                <div class="col">
                                    <input type="number" name="prix" value={sortie.prix} min="0" max="100" onChange={handleChange} />
                                </div>
                            </div>
                        </div>


                        <div class="form-group row">
                            <label for="inputPassword3" class="col-sm-2 col-form-label">Adresse</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" name="lieu" value={sortie.lieu} onChange={handleChange}></input>
                            </div>
                        </div>


                    
                        <div class="form-group">
                            <label for="inputPassword3" class="col-sm-2 col-form-label">Options</label>
                            <div class="col-sm-10">
                                {options.map((o) => {
                                    return (
                                        <div class="form-check">
                                            <input type="radio" name="idOption" value={o.id} class="form-check-input" id="exampleCheck1" onChange={handleChange}/>
                                            <label class="form-check-label" for="exampleCheck1">{o.nom}</label>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>


                        <div class="form-group">
                            <label class="col-form-label">Nom image</label>
                            <div class="form-inline mx-sm-3 mb-2">
                                <input type="text" class="form-control " name="nomImage" value={sortie.nomImage} onChange={handleChange}></input>
                                <Button onClick={() => verif()}>Vérifier lien</Button>
                            </div>
                            {image}
                        </div>

                        <div style={{ color: 'green' }}>{mess}</div>
                        <div style={{ color: 'red' }}>{err}</div>

                    </form>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fermer
                    </Button>
                    <Button variant="primary" onClick={modifierSortie}>
                        Valider
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PopupModifierSortie;