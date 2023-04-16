import React, { useState, useEffect } from 'react'
import image from './img/sortie-velo.jpeg';
import admin from './img/logo-admin.png';

function Accueil() {

    const [role, setRole] = useState();
    const [card, setCard] = useState();

    useEffect(() => {
        setRole(sessionStorage.getItem("role"))
        if (role == 'admin') {
            setCard(
                <div class="mb-3">
                    <div class="card mb-3">
                        <div class="card-body">
                            <h5 class="card-title">Administrateur</h5>
                        </div>
                        <img class="card-img-bottom" src={admin} alt="Card image cap" />

                    </div>
                </div>)
        } else {
            setCard(
                <div class="mb-3">
                    <div class="card mb-3">
                        <div class="card-body">
                            <h5 class="card-title">Bienvenue ! </h5>
                            <p class="card-text">Nous organisons souvent des sorties.</p>

                            <div class="text-center">
                                <a href="/ListeSorties"><button type="button" class="btn btn-success">Voir les toutes les sorties</button></a>
                            </div>
                        </div>
                        <img class="card-img-bottom" src={image} alt="Card image cap" />

                    </div>
                </div>
            )
        }
    }, [role])

    return (
        <div>
            {card}
        </div>
    )
}
export default Accueil