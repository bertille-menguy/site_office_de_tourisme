package com.officetourisme.officetourisme.service;

import com.officetourisme.officetourisme.modele.Commentaire;
import com.officetourisme.officetourisme.modele.Option;
import com.officetourisme.officetourisme.modele.Sortie;
import com.officetourisme.officetourisme.modele.Utilisateur;
import com.officetourisme.officetourisme.repository.OptionRepository;
import com.officetourisme.officetourisme.repository.SortieRepository;
import com.officetourisme.officetourisme.repository.UtilisateurRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class SortieServiceImpl implements SortieService {

    private final SortieRepository sortieRepository;

    private final OptionRepository optionRepository;

    private final UtilisateurRepository utilisateurRepository;



    @Override
    public Sortie creer(Sortie sortie, Long idOption) {
        return optionRepository.findById(idOption).map(o->{
            sortie.setChoixOption(o);
            return sortieRepository.save(sortie);
        }).orElseThrow(()->new RuntimeException("Option n'existe pas !"));
    }

    @Override
    public List<Sortie> lire() {
        return sortieRepository.findAll();
    }

    @Override
    public Sortie modifier(Long id, Sortie sortie, Long idOption) {
        return sortieRepository.findById(id)
                .map(s->{
                    s.setNom(sortie.getNom());
                    s.setLieu(sortie.getLieu());
                    s.setDate(sortie.getDate());
                    s.setNomImage(sortie.getNomImage());
                    s.setPrix(sortie.getPrix());
                    return optionRepository.findById(idOption).map(o->{
                        s.setChoixOption(o);
                        return sortieRepository.save(s);
                    }).orElseThrow(()->new RuntimeException("Option n'existe pas !"));
                }).orElseThrow(()->new RuntimeException("Sortie n'existe pas !"));
    }

    @Override
    public String supprimer(Long id) {
        sortieRepository.deleteById(id);
        return "Sortie supprimée";
    }

    @Override
    public Collection<Commentaire> voirCommentaires(Long id){
        Collection<Commentaire> liste = sortieRepository.findById(id).get().getCommentaireCollection();
        return liste;
    }


    @Override
    public Sortie ajouterCommentaire(Long id, String texte, String pseudo){
        LocalDateTime date = LocalDateTime.now();
        Commentaire commentaire = new Commentaire(texte, date);

        Utilisateur u = utilisateurRepository.findByPseudo(pseudo);

        return sortieRepository.findById(id)
                .map(s->{
                    commentaire.setIdUtilisateur(u);
                    commentaire.setIdSortie(s);
                    s.getCommentaireCollection().add(commentaire);
                    return sortieRepository.save(s);
                }).orElseThrow(()->new RuntimeException("Sortie n'existe pas !"));
    }

}
