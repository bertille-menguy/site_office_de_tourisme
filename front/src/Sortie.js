import React, { useEffect, useState } from "react";
import Moment from 'moment';
import PopupSupSortie from './PopupSupSortie';
import PopupModifierSortie from './PopupModifierSortie';
import { FiCalendar } from "react-icons/fi";
import { BiMap } from "react-icons/bi";
import 'moment/locale/fr'
import PopupAjouterAuPanier from './PopupAjouterAuPanier';
import PopupListeInscrits from "./PopupListeInscrits";
import axios from 'axios'
import Commentaire from './Commentaire';
import { IoMdSend } from "react-icons/io";


function Sortie({ element }) {

    const [bouton, setBouton] = useState()
    const [role, setRole] = useState(sessionStorage.getItem("role"))
    const [nbPersonnesInscrites, setNbPersonnesInscrites] = useState();
    const [voir, setVoir] = useState();
    const [show, setShow] = useState(false);
    const [commentaire, setCommentaire] = useState("");
    const [pseudo, setPseudo] = useState(sessionStorage.getItem("pseudo"));
    const [geneIdCommentaire, setGeneIdCommentaire] = useState("commentaire" + element.id)
    const [geneIdNvCommentaire, setGeneIdNvCommentaire] = useState("Nvcommentaire" + element.id)


    const envoyer = async (e) => {
        e.preventDefault()
        console.log("ajouter commentaire")

        try {

            const head = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ commentaire: commentaire, pseudo: pseudo, idSortie: element.id })
            };

            const res = axios.post("./commentairer", { commentaire: commentaire, pseudo: pseudo, idSortie: element.id }, head);

            if (res) {
                setCommentaire("")
            }

        } catch (err) {
            console.log("Erreure connexion json err : " + JSON.stringify(err))
            console.log("Erreur connexion : " + err.response.data)
        }
    }

    useEffect(() => {
        if (show) {
            document.getElementById(geneIdCommentaire).style.display = "block";
            setVoir("Afficher moins")

        } else {
            document.getElementById(geneIdCommentaire).style.display = "none";
            setVoir("Afficher les commentaires")
        }
    })


    useEffect(() => {
        if (role == 'membre') {
            document.getElementById(geneIdNvCommentaire).style.display = "block";
        } else {
            document.getElementById(geneIdNvCommentaire).style.display = "none";
        }
    }, [role])



    function convertDate(date) {
        Moment.locale('fr');
        return (Moment(date).format('LLL'))
    }


    function isInscrit(personne) {
        return personne.pseudo === pseudo;
    }



    useEffect(() => {

        if (role == 'admin') {
            setBouton(
                <div class="d-flex justify-content-end">
                    <PopupModifierSortie element={element} />
                    <PopupSupSortie identifiant={element.id} />
                </div>)
            setNbPersonnesInscrites(<PopupListeInscrits liste={element.utilisateurCollection} />)

        } else if (role == 'membre') {

            if (element.utilisateurCollection.find(isInscrit)) {
                setBouton(<div class="d-flex justify-content-end"><button type="button" class="btn btn-secondary" disabled>Inscrit</button></div>)
            } else if (element.utilisateurCollectionPanier.find(isInscrit)){
                setBouton(<div class="d-flex justify-content-end"><button type="button" class="btn btn-primary" disabled>Déjà dans le panier</button></div>)
            } else {
                setBouton(<div class="d-flex justify-content-end"><PopupAjouterAuPanier identifiant={element.id} /></div>)
            }


        } else {
            setBouton()
        }
    })



    return (
        <div>
            <div class="card mb-3">
                <div class="card-header"> 
                    <div class="row justify-content-between">
                        <div class="col-auto mr-auto">
                            <h5 >{element.nom} </h5>
                        </div>
                        <div class="col-auto">
                            {element.prix == 0 ? 'Gratuit' : element.prix + ' €' }
                        </div>
                    </div>
                    {nbPersonnesInscrites}
                </div>
                <div class="card-body">
                    <img src={require('./img/' + element.nomImage)} class="img-fluid mb-2" alt="Responsive image" width='500'/>
                    <p class="card-text"> <BiMap /> {element.lieu}</p>
                    <p class="card-text"> <FiCalendar /> {convertDate(element.date)}</p>
                    <span class="badge badge-info">{element.choixOption.nom}</span>
                </div>
                {bouton}
                <div>
                    <div>
                        <p class="text-center"><a href="#" class="text-center" onClick={() => setShow(!show)} >{voir}</a></p>
                        <div id={geneIdCommentaire} class="text contenu">
                            <section class="gradient-custom">
                                <div class="container py-3">
                                    <div class="row d-flex justify-content-center">
                                        <div class="col-md-12 col-lg-10 col-xl-8">

                                            <div id={geneIdNvCommentaire}>
                                                <div class="input-group mb-3">
                                                    <input type="text" class="form-control" value={commentaire} onChange={(e) => setCommentaire(e.target.value)} placeholder="Ajouter un commentaire..." />
                                                    <div class="input-group-append">
                                                        <a href="#" onClick={envoyer} class="input-group-text"><IoMdSend /></a>
                                                    </div>
                                                </div>
                                            </div>

                                            {element.commentaireCollection.map((c) => {
                                                return (
                                                    <Commentaire commentaire={c}></Commentaire>
                                                )
                                            })}
                                        </div>

                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    )
}

export default Sortie;
