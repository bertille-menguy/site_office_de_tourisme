import React, { useState, useEffect } from "react";
import PopupAjoutMembre from "./PopupAjoutMembre";
import PopupAjoutAdmin from "./PopupAjoutAdmin";
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';


import axios from 'axios'
import PopupSupUtilisateur from "./PopupSupUtilisateur";

function ListeMembres() {

    const [utilisateurs, setUtilisateurs] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.post("./lister_utilisateur");
                setUtilisateurs(res.data.data);
                console.log(res.data.data)

            } catch (error) {
                console.error(error.message);
            }
        }
        fetchData();
    }, [utilisateurs]);


    return (
        <div>
            <div class="d-flex justify-content-between mb-3">
                <h3>Liste des membres</h3>
                <ButtonToolbar aria-label="Toolbar with button groups">
                    <PopupAjoutMembre />
                    <PopupAjoutAdmin />
                </ButtonToolbar>
            </div>

            <MDBTable>
                <MDBTableHead light>
                    <tr>
                        <th scope='col'>role</th>
                        <th scope='col'>identifiant</th>
                        <th scope='col'></th>
                    </tr>
                </MDBTableHead>

                <MDBTableBody>


                    {utilisateurs.map((u) => {
                        return (

                            <tr>
                                <th scope='row'> {u.role} </th>
                                <td> {u.pseudo}</td>
                                <td> <PopupSupUtilisateur identifiant={u.id} /></td>
                            </tr>

                        );
                    })}



                </MDBTableBody>
            </MDBTable>

        </div>
    )
}
export default ListeMembres;
