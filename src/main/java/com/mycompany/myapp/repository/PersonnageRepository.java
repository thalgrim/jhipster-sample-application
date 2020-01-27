package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Personnage;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Personnage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PersonnageRepository extends JpaRepository<Personnage, Long> {

}
