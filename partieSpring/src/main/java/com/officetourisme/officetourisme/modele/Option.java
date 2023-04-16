package com.officetourisme.officetourisme.modele;
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

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
@Table(name = "option")
@NamedQueries({
        @NamedQuery(name = "Option.findAll", query = "SELECT o FROM Option o"),
        @NamedQuery(name = "Option.findById", query = "SELECT o FROM Option o WHERE o.id = :id"),
        @NamedQuery(name = "Option.findByNom", query = "SELECT o FROM Option o WHERE o.nom = :nom")})
public class Option implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Long id;
    @Basic(optional = false)
    @Column(name = "nom")
    private String nom;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "ChoixOption")
    @JsonIgnore
    private Collection<Sortie> sortieCollection;

    public Option() {
    }

    public Option(Long id) {
        this.id = id;
    }

    public Option(Long id, String nom) {
        this.id = id;
        this.nom = nom;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Collection<Sortie> getSortieCollection() {
        return sortieCollection;
    }

    public void setSortieCollection(Collection<Sortie> sortieCollection) {
        this.sortieCollection = sortieCollection;
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
        if (!(object instanceof Option)) {
            return false;
        }
        Option other = (Option) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "test.Option[ id=" + id + " ]";
    }

}
