package com.officetourisme.officetourisme.modele;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jdk.jshell.execution.Util;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author bertillemenguy
 */
@Entity
@Table(name = "commentaire")
@NamedQueries({
        @NamedQuery(name = "Commentaire.findAll", query = "SELECT c FROM Commentaire c"),
        @NamedQuery(name = "Commentaire.findById", query = "SELECT c FROM Commentaire c WHERE c.id = :id"),
        @NamedQuery(name = "Commentaire.findByTexte", query = "SELECT c FROM Commentaire c WHERE c.texte = :texte"),
        @NamedQuery(name = "Commentaire.findByDate", query = "SELECT c FROM Commentaire c WHERE c.date = :date")})
public class Commentaire implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Long id;
    @Basic(optional = false)
    @Column(name = "texte")
    private String texte;
    @Basic(optional = false)
    @Column(name = "date")
    @JsonFormat(pattern="yyyy-MM-dd'T'HH:mm")
    private LocalDateTime date;
    @JoinColumn(name = "idSortie", referencedColumnName = "id")
    @ManyToOne(optional = false)
    @JsonIgnore
    private Sortie idSortie;


    @JoinColumn(name = "idUtilisateur", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Utilisateur idUtilisateur;


    public Commentaire() {
    }

    public Commentaire(Long id) {
        this.id = id;
    }

    public Commentaire(Long id, String texte, LocalDateTime date) {
        this.id = id;
        this.texte = texte;
        this.date = date;
    }

    public Commentaire(String texte, LocalDateTime date) {
        this.texte = texte;
        this.date = date;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTexte() {
        return texte;
    }

    public void setTexte(String texte) {
        this.texte = texte;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public Sortie getIdSortie() {
        return idSortie;
    }

    public void setIdSortie(Sortie idSortie) {
        this.idSortie = idSortie;
    }

    public void setIdUtilisateur(Utilisateur idUtilisateur) {
        this.idUtilisateur = idUtilisateur;
    }


    public Utilisateur getIdUtilisateur() {
        return idUtilisateur;
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
        if (!(object instanceof Commentaire)) {
            return false;
        }
        Commentaire other = (Commentaire) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "test.Commentaire[ id=" + id + " ]";
    }

}
