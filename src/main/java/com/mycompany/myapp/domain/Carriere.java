package com.mycompany.myapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Carriere.
 */
@Entity
@Table(name = "carriere")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Carriere implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nom")
    private String nom;

    @OneToMany(mappedBy = "carriere")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Echelon> echelons = new HashSet<>();

    @OneToMany(mappedBy = "carriere")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Classe> classes = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("carrieres")
    private Personnage personnage;

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

    public Carriere nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Set<Echelon> getEchelons() {
        return echelons;
    }

    public Carriere echelons(Set<Echelon> echelons) {
        this.echelons = echelons;
        return this;
    }

    public Carriere addEchelon(Echelon echelon) {
        this.echelons.add(echelon);
        echelon.setCarriere(this);
        return this;
    }

    public Carriere removeEchelon(Echelon echelon) {
        this.echelons.remove(echelon);
        echelon.setCarriere(null);
        return this;
    }

    public void setEchelons(Set<Echelon> echelons) {
        this.echelons = echelons;
    }

    public Set<Classe> getClasses() {
        return classes;
    }

    public Carriere classes(Set<Classe> classes) {
        this.classes = classes;
        return this;
    }

    public Carriere addClasse(Classe classe) {
        this.classes.add(classe);
        classe.setCarriere(this);
        return this;
    }

    public Carriere removeClasse(Classe classe) {
        this.classes.remove(classe);
        classe.setCarriere(null);
        return this;
    }

    public void setClasses(Set<Classe> classes) {
        this.classes = classes;
    }

    public Personnage getPersonnage() {
        return personnage;
    }

    public Carriere personnage(Personnage personnage) {
        this.personnage = personnage;
        return this;
    }

    public void setPersonnage(Personnage personnage) {
        this.personnage = personnage;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Carriere)) {
            return false;
        }
        return id != null && id.equals(((Carriere) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Carriere{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            "}";
    }
}
