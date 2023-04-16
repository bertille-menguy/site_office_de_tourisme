package com.officetourisme.officetourisme.repository;

import com.officetourisme.officetourisme.modele.Sortie;
import org.springframework.data.jpa.repository.JpaRepository;


public interface SortieRepository extends JpaRepository<Sortie, Long> {
    
}
