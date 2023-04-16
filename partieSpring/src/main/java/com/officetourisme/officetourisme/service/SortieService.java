package com.officetourisme.officetourisme.service;

import com.officetourisme.officetourisme.modele.Commentaire;
import com.officetourisme.officetourisme.modele.Sortie;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface SortieService {

    Sortie creer(Sortie sortie, Long idOption);

    List<Sortie> lire();

    Sortie modifier(Long id, Sortie sortie, Long idOption);

    String supprimer(Long id);

    Sortie ajouterCommentaire(Long id, String texte, String pseudo);

    Collection<Commentaire> voirCommentaires(Long id);


}
