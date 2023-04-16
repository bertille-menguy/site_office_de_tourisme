package com.officetourisme.officetourisme.modele;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Date;
import java.util.Set;
import javax.persistence.*;

/**
 *
 * @author bertillemenguy
 */
@Entity
@Table(name = "sortie")
@NamedQueries({
        @NamedQuery(name = "Sortie.findAll", query = "SELECT s FROM Sortie s"),
        @NamedQuery(name = "Sortie.findById", query = "SELECT s FROM Sortie s WHERE s.id = :id"),
        @NamedQuery(name = "Sortie.findByNom", query = "SELECT s FROM Sortie s WHERE s.nom = :nom"),
        @NamedQuery(name = "Sortie.findByLieu", query = "SELECT s FROM Sortie s WHERE s.lieu = :lieu"),
        @NamedQuery(name = "Sortie.findByDate", query = "SELECT s FROM Sortie s WHERE s.date = :date")})
public class Sortie implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Long id;
    @Basic(optional = false)
    @Column(name = "nom")
    private String nom;

    @Basic(optional = false)
    @Column(name = "nomImage")
    private String nomImage;
    @Basic(optional = false)
    @Column(name = "lieu")
    private String lieu;

    @Basic(optional = false)
    @Column(name = "prix")
    private int prix;
    @Basic(optional = false)
    @Column(name = "date")
    @JsonFormat(pattern="yyyy-MM-dd'T'HH:mm")
    private LocalDateTime date;
    @ManyToMany(mappedBy = "sortieCollection")
    private Set<Utilisateur> utilisateurCollection;

    @ManyToMany(mappedBy = "sortieCollectionPanier")
    private Set<Utilisateur> utilisateurCollectionPanier;

    @JoinColumn(name = "ChoixOption", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Option ChoixOption;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "idSortie")
    private Collection<Commentaire> commentaireCollection;

    public Sortie() {
    }

    public Sortie(Long id) {
        this.id = id;
    }

    public Sortie(Long id, String nom, String lieu, int prix, LocalDateTime date, String nomImage) {
        this.id = id;
        this.nom = nom;
        this.lieu = lieu;
        this.prix=prix;
        this.date = date;
        this.nomImage=nomImage;
    }

    public String getNomImage(){
        return nomImage;
    }

    public void setNomImage(String nomIm){
        this.nomImage=nomIm;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getPrix(){return prix;}

    public void setPrix(int prix){this.prix=prix;}

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getLieu() {
        return lieu;
    }

    public void setLieu(String lieu) {
        this.lieu = lieu;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public Collection<Utilisateur> getUtilisateurCollection() {
        return utilisateurCollection;
    }

    public void setUtilisateurCollection(Set<Utilisateur> utilisateurCollection) {
        this.utilisateurCollection = utilisateurCollection;
    }


    public Collection<Utilisateur> getUtilisateurCollectionPanier() {
        return utilisateurCollectionPanier;
    }

    public void setUtilisateurCollectionPanier(Set<Utilisateur> utilisateurCollectionPanier) {
        this.utilisateurCollectionPanier = utilisateurCollectionPanier;
    }

    public Option getChoixOption() {
        return this.ChoixOption;
    }

    public void setChoixOption(Option ChoixOption) {
        this.ChoixOption = ChoixOption;
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
        if (!(object instanceof Sortie)) {
            return false;
        }
        Sortie other = (Sortie) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }


    @Override
    public String toString() {
        return "test.Sortie[ id=" + id + " ]";
    }

}
