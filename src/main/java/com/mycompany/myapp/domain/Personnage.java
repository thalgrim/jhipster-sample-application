package com.mycompany.myapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Personnage.
 */
@Entity
@Table(name = "personnage")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Personnage implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nom")
    private String nom;

    @OneToMany(mappedBy = "personnage")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Race> races = new HashSet<>();

    @OneToMany(mappedBy = "personnage")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Carriere> carrieres = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("personnages")
    private Utilisateur utilisateur;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public Personnage nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Set<Race> getRaces() {
        return races;
    }

    public Personnage races(Set<Race> races) {
        this.races = races;
        return this;
    }

    public Personnage addRace(Race race) {
        this.races.add(race);
        race.setPersonnage(this);
        return this;
    }

    public Personnage removeRace(Race race) {
        this.races.remove(race);
        race.setPersonnage(null);
        return this;
    }

    public void setRaces(Set<Race> races) {
        this.races = races;
    }

    public Set<Carriere> getCarrieres() {
        return carrieres;
    }

    public Personnage carrieres(Set<Carriere> carrieres) {
        this.carrieres = carrieres;
        return this;
    }

    public Personnage addCarriere(Carriere carriere) {
        this.carrieres.add(carriere);
        carriere.setPersonnage(this);
        return this;
    }

    public Personnage removeCarriere(Carriere carriere) {
        this.carrieres.remove(carriere);
        carriere.setPersonnage(null);
        return this;
    }

    public void setCarrieres(Set<Carriere> carrieres) {
        this.carrieres = carrieres;
    }

    public Utilisateur getUtilisateur() {
        return utilisateur;
    }

    public Personnage utilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
        return this;
    }

    public void setUtilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Personnage)) {
            return false;
        }
        return id != null && id.equals(((Personnage) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Personnage{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            "}";
    }
}
