package com.officetourisme.officetourisme.repository;

import com.officetourisme.officetourisme.modele.Commentaire;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentaireRepository extends JpaRepository<Commentaire, Long> {
}
