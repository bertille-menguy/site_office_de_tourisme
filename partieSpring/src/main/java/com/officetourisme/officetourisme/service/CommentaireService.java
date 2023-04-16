package com.officetourisme.officetourisme.service;

import com.officetourisme.officetourisme.modele.Commentaire;

import java.util.List;

public interface CommentaireService {

    Commentaire creer(Commentaire com);

    List<Commentaire> lire();

    String supprimer(Long id);

}
