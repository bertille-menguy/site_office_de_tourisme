import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { RiDeleteBin2Line } from 'react-icons/ri';
import axios from 'axios'

function PopupPanier() {

    const [show, setShow] = useState(false);


    const [sortie_utilisateur, setsortie_utilisateur] = useState();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [pseudo, setPseudo] = useState(sessionStorage.getItem("pseudo"))
    const [sorties, setSorties] = useState([])

    const [err, setErr] = useState("")


    function validation() {
        sorties.map((s) => {
            payer(s.id);
        });
        vider_panier();
    }


    const payer = async (identifiant) => {
       
        console.log("payer sortie : " + {
            pseudo: pseudo,
            idSortie: identifiant,
        })

        const head = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pseudo: pseudo,
                idSortie: identifiant,
            })
        };

        const res = await axios.post('/inscription_sortie', {
            pseudo: pseudo,
            idSortie: identifiant,
        }, head);

        if (res.data.res) {
            handleClose();
        } else {
            setErr(res.data.mess)
        }
    }


    const vider_panier = async () => {

        const head = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({pseudo: pseudo})
        };

        const res = await axios.post('/vider_panier', {pseudo: pseudo}, head);

        if (res.data.res) {
            handleClose();
        } else {
            setErr(res.data.mess)
        }
    }


    const suppDuPanier = async (id) => {
        const head = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({pseudo: pseudo, idSortie:id})
        };

        const res = await axios.post('/supp_du_panier', {pseudo: pseudo, idSortie:id}, head);

        if (res.data.res) {
        } else {
            setErr(res.data.mess)
        }
    }



    useEffect(() => {
        const fetchData = async () => {
            try {
                const pseudo = { pseudo: sessionStorage.getItem("pseudo") };
                const head = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(pseudo)
                };

                const res = await axios.post("./panier_utilisateur", pseudo, head);
                setSorties(res.data.data);
            } catch (error) {
                console.error(error.message);
            }
        }
        fetchData();
    }, [sorties]);

    let totalPrix = sorties.reduce((total, sortie) => total + sortie.prix, 0);

    return (
        <>
            <p class="" ><a href="#" onClick={handleShow} >Mon panier <AiOutlineShoppingCart /><span class="badge badge-pill badge-danger">{sorties.length}</span></a></p>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Mon panier</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul class="list-group list-group-flush">
                        {
                            sorties.map((s) => {
                                return (
                                    <div class="row justify-content-between">
                                        <div class="col-auto mr-auto">
                                            <li class="list-group-item">{s.nom}</li>
                                        </div>
                                        <div class="col-auto">
                                            <p>{s.prix} € <a href='#' onClick={()=>suppDuPanier(s.id)}><RiDeleteBin2Line /></a></p>
                                        </div>
                                    </div>)
                            })
                        }


                    </ul>



                    <div class="row justify-content-between">
                        <div class="col-auto mr-auto">
                            <div><h5>Total : {totalPrix} €</h5></div>
                        </div>
                        <div class="col-auto">
                            <Button onClick={validation}>Payer</Button>
                        </div>
                    </div>

                    <div style={{ color: 'red' }}>{err}</div>


                </Modal.Body>
            </Modal>
        </>
    );
}

export default PopupPanier;