import axios from 'axios'
import React, { useState, useEffect } from "react";
import Sortie from './Sortie';
import PopupAjoutSortie from './PopupAjoutSortie';


function ListeSorties() {


    const [role, setRole] = useState([])
    const [sorties, setSorties] = useState([])
    const [boutonAjout, setAjout] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.post("./lister_sorties");
                setSorties(res.data.data);
            } catch (error) {
                console.error(error.message);
            }
        }
        fetchData();
    });

    useEffect(() => {
        setRole(sessionStorage.getItem("role"))
        if (role == 'admin') {
            setAjout(<PopupAjoutSortie />)
        } else {
            setAjout();
        }
    }, [role]);


    return (
        <div>

            <div class="d-flex justify-content-between mb-3">
                <p> <strong class="text-success">{sorties.length}</strong> sorties à venir</p>
                {boutonAjout}
            </div>

        {
            sorties.map((s)=>{
                return (<Sortie element={s}></Sortie>)
            })
        }

        </div>
    )
}
export default ListeSorties;
