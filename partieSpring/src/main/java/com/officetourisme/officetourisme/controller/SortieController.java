package com.officetourisme.officetourisme.controller;

import com.officetourisme.officetourisme.modele.Commentaire;
import com.officetourisme.officetourisme.modele.Sortie;
import com.officetourisme.officetourisme.service.SortieService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/sortie")
@AllArgsConstructor
public class SortieController {
    private final SortieService sortieService;


    @PostMapping("/create/option/{idOption}")
    public Sortie create(@RequestBody Sortie sortie, @PathVariable Long idOption){
        return sortieService.creer(sortie, idOption);
    }

    @GetMapping("/read")
    public List<Sortie> read() {
        return sortieService.lire();
    }

    @PutMapping("/update/{id}/option/{idOption}")
    public Sortie update(@PathVariable Long id, @PathVariable Long idOption, @RequestBody Sortie sortie){
        return sortieService.modifier(id,sortie, idOption);
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Long id){
        return sortieService.supprimer(id);
    }


    @PutMapping("/{pseudo}/{id}/ajouter_commentaire")
    public Sortie addCommentaire(@PathVariable Long id, @PathVariable String pseudo, @RequestBody String commentaire){
        return sortieService.ajouterCommentaire(id, commentaire, pseudo);
    }


    @GetMapping("/{id}/commentaires")
    public Collection<Commentaire> getCommentaires(@PathVariable Long id){
        return sortieService.voirCommentaires(id);
    }


}
