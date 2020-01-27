package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Echelon;
import com.mycompany.myapp.repository.EchelonRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Echelon}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EchelonResource {

    private final Logger log = LoggerFactory.getLogger(EchelonResource.class);

    private static final String ENTITY_NAME = "echelon";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EchelonRepository echelonRepository;

    public EchelonResource(EchelonRepository echelonRepository) {
        this.echelonRepository = echelonRepository;
    }

    /**
     * {@code POST  /echelons} : Create a new echelon.
     *
     * @param echelon the echelon to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new echelon, or with status {@code 400 (Bad Request)} if the echelon has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/echelons")
    public ResponseEntity<Echelon> createEchelon(@RequestBody Echelon echelon) throws URISyntaxException {
        log.debug("REST request to save Echelon : {}", echelon);
        if (echelon.getId() != null) {
            throw new BadRequestAlertException("A new echelon cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Echelon result = echelonRepository.save(echelon);
        return ResponseEntity.created(new URI("/api/echelons/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /echelons} : Updates an existing echelon.
     *
     * @param echelon the echelon to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated echelon,
     * or with status {@code 400 (Bad Request)} if the echelon is not valid,
     * or with status {@code 500 (Internal Server Error)} if the echelon couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/echelons")
    public ResponseEntity<Echelon> updateEchelon(@RequestBody Echelon echelon) throws URISyntaxException {
        log.debug("REST request to update Echelon : {}", echelon);
        if (echelon.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Echelon result = echelonRepository.save(echelon);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, echelon.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /echelons} : get all the echelons.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of echelons in body.
     */
    @GetMapping("/echelons")
    public List<Echelon> getAllEchelons() {
        log.debug("REST request to get all Echelons");
        return echelonRepository.findAll();
    }

    /**
     * {@code GET  /echelons/:id} : get the "id" echelon.
     *
     * @param id the id of the echelon to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the echelon, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/echelons/{id}")
    public ResponseEntity<Echelon> getEchelon(@PathVariable Long id) {
        log.debug("REST request to get Echelon : {}", id);
        Optional<Echelon> echelon = echelonRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(echelon);
    }

    /**
     * {@code DELETE  /echelons/:id} : delete the "id" echelon.
     *
     * @param id the id of the echelon to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/echelons/{id}")
    public ResponseEntity<Void> deleteEchelon(@PathVariable Long id) {
        log.debug("REST request to delete Echelon : {}", id);
        echelonRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
