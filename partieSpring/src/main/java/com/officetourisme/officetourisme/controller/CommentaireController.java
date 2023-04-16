package com.officetourisme.officetourisme.controller;

import com.officetourisme.officetourisme.modele.Commentaire;
import com.officetourisme.officetourisme.service.CommentaireService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/commentaire")
@AllArgsConstructor
public class CommentaireController {

        private final CommentaireService commentaireService;

        @PostMapping("/create")
        public Commentaire create(@RequestBody Commentaire com){
            return commentaireService.creer(com);
        }

        @GetMapping("/read")
        public List<Commentaire> read() {
            return commentaireService.lire();
        }


        @DeleteMapping("/delete/{id}")
        public String delete(@PathVariable Long id){
            return commentaireService.supprimer(id);
        }
}
