package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Possession;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Possession entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PossessionRepository extends JpaRepository<Possession, Long> {

}
