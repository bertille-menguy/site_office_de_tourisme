import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';

function PopupAjoutSortie() {

    const [show, setShow] = useState(false);


    const handleShow = () => setShow(true);

    const [optionCollection, setOptionCollection] = useState([]);
    const inputRef = useRef(null)
    const [imageurl, setImageurl] = useState()


    const [image, setImage] = useState();

    const [sortie, setSortie] = useState({
        nom: "",
        date: "",
        lieu: "",
        idOption: "",
        image: "",
        prix: 0,
    })


    const handleClose = () => {
        setSortie({
            nom: "",
            date: "",
            lieu: "",
            idOption: "",
            image: "",
            prix: 0,
        })
        setShow(false);
        setImage();
    }

    const [errSortie, setErrSortie] = useState({
        nom: "",
        date: "",
        lieu: "",
        idOption: "",
        image: "",
        prix: 0,
    })

    const [mess, setMess] = useState("")
    const [err, setErr] = useState("")

    const [options, setOptions] = useState([])

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


    const handleChange = (e) => {
        console.log("handleChange")
        setSortie({
            ...sortie,
            [e.target.name]: e.target.value
        })
    }


    function verif() {
        try {
            setImage(<img src={require('./img/' + sortie.image)} width='200' />)
            return true
        } catch (err) {
            setImage(<p style={{ color: 'red' }}>Ce nom d'image n'existe pas</p>)
            return false
        }
    }


    const ajouterSortie = async (e) => {
        e.preventDefault()
        console.log("ajouter sortie")

        console.log("sortie = " + JSON.stringify(sortie))
        const s = JSON.stringify(sortie)
        console.log("s = " + s)


        if (verif()) {
            try {

                const head = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(sortie)
                };

                const res = await axios.post('/ajouter_sortie',
                    sortie, head);

                if (res.data.res) {
                    setMess("")
                    setErr("")
                    setErrSortie({})
                    setSortie({})
                    handleClose();
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

    }



    function getDate() {
        return moment().format("YYYY-MM-DD")
    }


    return (
        <div>

            <a href="#" class="btn btn-success" onClick={handleShow} >Ajouter</a>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Ajouter une sortie</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form>
                        <div class="form-group">
                            <label class="col-form-label">Nom de la sortie</label>
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


                        <div class="form-group">
                            <label class="col-form-label">Adresse</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" name="lieu" value={sortie.lieu} onChange={handleChange}></input>
                            </div>
                        </div>


                        <div class="form-group">
                            <label class=" col-form-label">Options : </label>
                            <div class="col-sm-10">
                                {options.map((o) => {
                                    return (
                                        <div class="form-check">
                                            <input type="radio" name="idOption" value={o.id} class="form-check-input" id="exampleCheck1" onChange={handleChange} />
                                            <label class="form-check-label" for="exampleCheck1">{o.nom}</label>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>


                        <div class="form-group">
                            <label class="col-form-label">Nom image</label>
                            <div class="form-inline mx-sm-3 mb-2">
                                <input type="text" class="form-control " name="image" value={sortie.image} onChange={handleChange}></input>
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
                    <Button variant="primary" onClick={ajouterSortie}>
                        Valider
                    </Button>
                </Modal.Footer>
            </Modal >
        </div >
    );
}

export default PopupAjoutSortie;