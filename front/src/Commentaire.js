import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/fr';

function Commentaire({ commentaire }) {


    function convertDate(date) {
        moment.locale('fr');
        return (moment(date).fromNow());
    }

    return (
    
            <div class="card">
                <div class="card-body p-4">
                    <div class="row">
                        <div class="col">
                            <div class="d-flex flex-start">

                                <div class="flex-grow-1 flex-shrink-1">
                                    <div>
                                        <div class="d-flex justify-content-between align-items-center">
                                            <p class="mb-1">
                                                {commentaire.idUtilisateur.pseudo} <span class="small"> - {convertDate(commentaire.date)}</span>
                                            </p>
                                        </div>
                                        <p class="small mb-0">
                                            {commentaire.texte}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
    )
}

export default Commentaire;
