package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Echelon;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Echelon entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EchelonRepository extends JpaRepository<Echelon, Long> {

}
