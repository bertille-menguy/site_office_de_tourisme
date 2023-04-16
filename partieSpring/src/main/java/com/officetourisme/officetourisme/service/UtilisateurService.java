package com.officetourisme.officetourisme.service;

import com.officetourisme.officetourisme.modele.Sortie;
import com.officetourisme.officetourisme.modele.Utilisateur;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.List;
import java.util.Set;

public interface UtilisateurService {

    Utilisateur creer(Utilisateur utilisateur);

    List<Utilisateur> lire();

    String supprimer(Long id);

    Utilisateur cherche(String pseudo);

    Utilisateur ajouterSortie(String pseudo, Long idSortie);


    Utilisateur ajouterSortiePanier(String pseudo, Long idSortie);

    Set<Sortie> getSorties(String pseudo);

    Set<Sortie> getSortiesPanier(String pseudo);

     String viderPanier(String pseudo);

    String supprimerDuPanier(String pseudo, Long id);

    }
