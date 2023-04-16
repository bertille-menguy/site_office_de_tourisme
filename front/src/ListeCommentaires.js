import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { IoMdSend } from "react-icons/io";


import 'moment/locale/fr';
import Commentaire from './Commentaire';

function ListeCommentaires({ identifiant }) {

    const [addCom, setAddCom] = useState()

    const [voir, setVoir] = useState();
    const [role, setRole] = useState(sessionStorage.getItem("role"));
    const [show, setShow] = useState(false);

    const [commentaire, setCommentaire] = useState("");

    const [pseudo, setPseudo] = useState(sessionStorage.getItem("pseudo"));
    const [geneIdCommentaire, setGeneIdCommentaire] = useState("commentaire" + identifiant)
    const [geneIdNvCommentaire, setGeneIdNvCommentaire] = useState("Nvcommentaire" + identifiant)


    const [commentaires, setCommentaires] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const head = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ idSortie:identifiant })
                };

                const res = await axios.post("./voir_commentaire", { idSortie: identifiant }, head);
                setCommentaires(res.data.data);
            } catch (error) {
                console.error(error.message);
            }
        }
        fetchData();
    },[commentaires]);


    const envoyer = async (e) => {
        e.preventDefault()
        console.log("ajouter commentaire")

        try {

            const head = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ commentaire: commentaire, pseudo: pseudo, idSortie: identifiant })
            };

            const res = axios.post("./commentairer", { commentaire: commentaire, pseudo: pseudo, idSortie: identifiant }, head);

            if(res){
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
    }, [show])


    useEffect(() => {
        if (role == 'membre') {
            document.getElementById(geneIdNvCommentaire).style.display = "block";
        } else {
            document.getElementById(geneIdNvCommentaire).style.display = "none";
        }
    }, [role])




    return (

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

                                {commentaires.map((c) => {
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
    )
}

export default ListeCommentaires;
