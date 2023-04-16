package com.officetourisme.officetourisme.controller;


import com.officetourisme.officetourisme.modele.Sortie;
import com.officetourisme.officetourisme.modele.Utilisateur;
import com.officetourisme.officetourisme.service.UtilisateurService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;


@RestController
@RequestMapping("/utilisateur")
@AllArgsConstructor
public class UtilisateurController {

        private final UtilisateurService utilisateurService;

        @PostMapping("/create")
        public Utilisateur create(@RequestBody Utilisateur utilisateur){
            return utilisateurService.creer(utilisateur);
        }

        @GetMapping("/read")
        public List<Utilisateur> read() {
            return utilisateurService.lire();
        }

        @GetMapping("/get/{pseudo}")
        public Utilisateur get(@PathVariable String pseudo) {
            return utilisateurService.cherche(pseudo);
        }

        @DeleteMapping("/delete/{id}")
        public String delete(@PathVariable Long id){
            return utilisateurService.supprimer(id);
        }

        @PutMapping("/{pseudo}/ajouter_sortie/{idSortie}")
        public Utilisateur addSortie(@PathVariable String pseudo,@PathVariable Long idSortie) {
            return utilisateurService.ajouterSortie(pseudo, idSortie);
        }


    @PutMapping("/{pseudo}/ajouter_panier/{idSortie}")
    public Utilisateur addSortiePanier(@PathVariable String pseudo,@PathVariable Long idSortie) {
        return utilisateurService.ajouterSortiePanier(pseudo, idSortie);
    }

    @GetMapping("/{pseudo}/sorties")
        public Set<Sortie> listeSorties(@PathVariable String pseudo) {
            return utilisateurService.getSorties(pseudo);
        }

    @GetMapping("/{pseudo}/panier")
    public Set<Sortie> listeSortiesPanier(@PathVariable String pseudo) {
        return utilisateurService.getSortiesPanier(pseudo);
    }

    @PutMapping("/{pseudo}/vider_panier")
    public String deletePanier(@PathVariable String pseudo) {
        return utilisateurService.viderPanier(pseudo);
    }

    @PutMapping("/{pseudo}/supp_panier/{id}")
    public String DelDuPanier(@PathVariable String pseudo, @PathVariable Long id) {
        return utilisateurService.supprimerDuPanier(pseudo, id);
    }


}
