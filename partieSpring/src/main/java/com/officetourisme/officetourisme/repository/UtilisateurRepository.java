package com.officetourisme.officetourisme.repository;

import com.officetourisme.officetourisme.modele.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
    Utilisateur findByPseudo(String pseudo);

}
