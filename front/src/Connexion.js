import axios from 'axios'
import React, { useState } from "react";
import CreationCompte from './CreationCompte';
import Identification from './Identification';

function Connexion() {


    return (
        <div>  
                <div class="row">
                    <Identification />
                    <CreationCompte />
                </div>
        </div>

    )
}

export default Connexion;
