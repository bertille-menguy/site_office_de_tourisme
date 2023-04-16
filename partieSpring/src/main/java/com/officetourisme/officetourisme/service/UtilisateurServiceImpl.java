package com.officetourisme.officetourisme.service;

import com.officetourisme.officetourisme.modele.Sortie;
import com.officetourisme.officetourisme.modele.Utilisateur;
import com.officetourisme.officetourisme.repository.SortieRepository;
import com.officetourisme.officetourisme.repository.UtilisateurRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@AllArgsConstructor
public class UtilisateurServiceImpl implements UtilisateurService {

    private final UtilisateurRepository utilisateurRepository;

    private final SortieRepository sortieRepository;

    @Override
    public Utilisateur creer(Utilisateur utilisateur) {
        return utilisateurRepository.save(utilisateur);
    }

    @Override
    public List<Utilisateur> lire() {
        return utilisateurRepository.findAll();
    }


    @Override
    public String supprimer(Long id) {
        utilisateurRepository.deleteById(id);
        return "Utilisateur supprimée";
    }

    @Override
    public Utilisateur cherche(String pseudo){
        return utilisateurRepository.findByPseudo(pseudo);
    }

    @Override
    public Utilisateur ajouterSortie(String pseudo, Long idSortie) {
        Utilisateur u = utilisateurRepository.findByPseudo(pseudo);
        Optional<Sortie> s = sortieRepository.findById(idSortie);

        if( u == null ){
             throw new RuntimeException("Utilisateur n'existe pas");
        } else if (s.isEmpty()){
             throw new RuntimeException("Sortie n'existe pas");
        } else {
            u.getSortieCollection().add(s.get());
            s.get().getUtilisateurCollection().add(u);
            sortieRepository.save(s.get());
            return utilisateurRepository.save(u);
        }

    }


    @Override
    public Utilisateur ajouterSortiePanier(String pseudo, Long idSortie) {
        Utilisateur u = utilisateurRepository.findByPseudo(pseudo);
        Optional<Sortie> s = sortieRepository.findById(idSortie);

        if( u == null ){
            throw new RuntimeException("Utilisateur n'existe pas");
        } else if (s.isEmpty()){
            throw new RuntimeException("Sortie n'existe pas");
        } else {
            u.getSortieCollectionPanier().add(s.get());
            s.get().getUtilisateurCollectionPanier().add(u);
            sortieRepository.save(s.get());
            return utilisateurRepository.save(u);
        }

    }

    @Override
    public Set<Sortie> getSorties(String pseudo) {
        return utilisateurRepository.findByPseudo(pseudo).getSortieCollection();
    }


    @Override
    public Set<Sortie> getSortiesPanier(String pseudo) {
        return utilisateurRepository.findByPseudo(pseudo).getSortieCollectionPanier();
    }

    @Override
    public String viderPanier(String pseudo) {
        Utilisateur u = utilisateurRepository.findByPseudo(pseudo);
        u.setSortieCollectionPanier(new HashSet<>());
        utilisateurRepository.save(u);
        return  "Panier vidé";
    }

    @Override
    public String supprimerDuPanier(String pseudo, Long id) {
        Utilisateur u = utilisateurRepository.findByPseudo(pseudo);
        Optional<Sortie> s = sortieRepository.findById(id);
        u.getSortieCollectionPanier().remove(s.get());
        utilisateurRepository.save(u);
        return "Element supprimé";
    }

}
