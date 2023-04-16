import React, { useState, useEffect } from "react";
import axios from 'axios'
import { BiMap } from "react-icons/bi";
import Moment from 'moment';


function ListeInscriptions() {

    const [sorties, setSorties] = useState([])


    function convertDate(date) {
        Moment.locale('fr');
        return (Moment(date).format('LLL'))
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

                const res = await axios.post("./lister_sorties_utilisateur", pseudo, head);
                setSorties(res.data.data);
            } catch (error) {
                console.error(error.message);
            }
        }
        fetchData();
    }, [sorties]);


    return (
        <div>

            <div class="d-flex justify-content-between mb-3">
                <h3>Mes sorties</h3>
            </div>

            {
                sorties.map((s) => {
                    return (
                        <div class="card mb-2">
                            <div class="card-body">
                                <h5 class="card-title">{s.nom} - {s.prix} €</h5>
                                <h6 class="card-subtitle mb-2 text-muted">{convertDate(s.date)}</h6>
                                <p class="card-text"><BiMap />{s.lieu}</p>
                                <span class="badge badge-info">{s.choixOption.nom}</span>
                            </div>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default ListeInscriptions;