import axios from 'axios'
import React, { useState, useEffect } from "react";
import Sortie from './Sortie';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PopupModifierOption from './PopupModifierOption';
import PopupSupOption from './PopupSupOption';
import PopupAjoutOption from './PopupAjoutOption';

function ListeOptions() {

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
    }, [options]);


    return (
        <div>
            <div class="d-flex justify-content-between mb-3">
                <h3>Liste des options</h3>
                <PopupAjoutOption />
            </div>
            <ul class="list-group list-group-flush">
                {options.map((o) => {
                    return (
                        <li class="list-group-item d-flex justify-content-between align-items-center">{o.nom}
                            <div>
                                <PopupModifierOption element={o}/>
                                <PopupSupOption identifiant={o.id} />
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}
export default ListeOptions;
