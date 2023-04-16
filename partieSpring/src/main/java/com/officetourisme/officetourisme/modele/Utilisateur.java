package com.officetourisme.officetourisme.modele;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
import java.util.Collection;
import java.util.Set;
import javax.persistence.*;

/**
 *
 * @author bertillemenguy
 */
@Entity
@Table(name = "utilisateur")
@NamedQueries({
        @NamedQuery(name = "Utilisateur.findAll", query = "SELECT u FROM Utilisateur u"),
        @NamedQuery(name = "Utilisateur.findById", query = "SELECT u FROM Utilisateur u WHERE u.id = :id"),
        @NamedQuery(name = "Utilisateur.findByPseudo", query = "SELECT u FROM Utilisateur u WHERE u.pseudo = :pseudo"),
        @NamedQuery(name = "Utilisateur.findByMdp", query = "SELECT u FROM Utilisateur u WHERE u.mdp = :mdp"),
        @NamedQuery(name = "Utilisateur.findByRole", query = "SELECT u FROM Utilisateur u WHERE u.role = :role")})
public class Utilisateur implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Long id;
    @Basic(optional = false)
    @Column(name = "mdp")
    private String mdp;
    @Basic(optional = false)
    @Column(name = "role")
    private String role;

    @Basic(optional = false)
    @Column(name = "pseudo")
    private String pseudo;

    @JoinTable(name = "utilisateur_sortie", joinColumns = {
            @JoinColumn(name = "id_utilisateur")}, inverseJoinColumns = {
            @JoinColumn(name = "id_sortie")})
    @ManyToMany
    @JsonIgnore
    private Set<Sortie> sortieCollection;

    @JoinTable(name = "utilisateur_sortie_panier", joinColumns = {
            @JoinColumn(name = "id_utilisateur")}, inverseJoinColumns = {
            @JoinColumn(name = "id_sortie")})
    @ManyToMany
    @JsonIgnore
    private Set<Sortie> sortieCollectionPanier;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "idUtilisateur")
    @JsonIgnore
    private Collection<Commentaire> commentaireCollection;


    public Utilisateur() {
    }

    public Utilisateur(Long id) {
        this.id = id;
    }

    public Utilisateur(Long id, String mdp, String role, String pseudo) {
        this.id = id;
        this.mdp = mdp;
        this.role = role;
        this.pseudo = pseudo;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPseudo(){
        return pseudo;
    }

    public void setPseudo(String pseudo){
        this.pseudo=pseudo;
    }

    public String getMdp() {
        return mdp;
    }

    public void setMdp(String mdp) {
        this.mdp = mdp;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Set<Sortie> getSortieCollection() {
        return sortieCollection;
    }

    public void setSortieCollection(Set<Sortie> sortieCollection) {
        this.sortieCollection = sortieCollection;
    }


    public Set<Sortie> getSortieCollectionPanier() {
        return sortieCollectionPanier;
    }

    public void setSortieCollectionPanier(Set<Sortie> sortieCollectionPanier) {
        this.sortieCollectionPanier = sortieCollectionPanier;
    }



    public Collection<Commentaire> getCommentaireCollection() {
        return commentaireCollection;
    }

    public void setCommentaireCollection(Collection<Commentaire> commentaireCollection) {
        this.commentaireCollection = commentaireCollection;
    }


    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Utilisateur)) {
            return false;
        }
        Utilisateur other = (Utilisateur) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "test.Utilisateur[ id=" + id + " ]";
    }

}
