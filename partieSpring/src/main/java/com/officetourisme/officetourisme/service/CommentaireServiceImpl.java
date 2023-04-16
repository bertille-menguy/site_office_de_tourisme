package com.officetourisme.officetourisme.service;

import com.officetourisme.officetourisme.modele.Commentaire;
import com.officetourisme.officetourisme.repository.CommentaireRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@AllArgsConstructor
public class CommentaireServiceImpl implements CommentaireService {

    private final CommentaireRepository commentaireRepository;

    @Override
    public Commentaire creer(Commentaire com) {
        return commentaireRepository.save(com);

    }

    @Override
    public List<Commentaire> lire() {
        return commentaireRepository.findAll();
    }

    @Override
    public String supprimer(Long id) {
        commentaireRepository.deleteById(id);
        return "Commentaire supprimée";
    }
}
