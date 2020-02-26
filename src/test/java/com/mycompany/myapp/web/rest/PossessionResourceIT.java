package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterSampleApplicationApp;
import com.mycompany.myapp.domain.Possession;
import com.mycompany.myapp.repository.PossessionRepository;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PossessionResource} REST controller.
 */
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class PossessionResourceIT {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    @Autowired
    private PossessionRepository possessionRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restPossessionMockMvc;

    private Possession possession;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PossessionResource possessionResource = new PossessionResource(possessionRepository);
        this.restPossessionMockMvc = MockMvcBuilders.standaloneSetup(possessionResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Possession createEntity(EntityManager em) {
        Possession possession = new Possession()
            .nom(DEFAULT_NOM);
        return possession;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Possession createUpdatedEntity(EntityManager em) {
        Possession possession = new Possession()
            .nom(UPDATED_NOM);
        return possession;
    }

    @BeforeEach
    public void initTest() {
        possession = createEntity(em);
    }

    @Test
    @Transactional
    public void createPossession() throws Exception {
        int databaseSizeBeforeCreate = possessionRepository.findAll().size();

        // Create the Possession
        restPossessionMockMvc.perform(post("/api/possessions")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(possession)))
            .andExpect(status().isCreated());

        // Validate the Possession in the database
        List<Possession> possessionList = possessionRepository.findAll();
        assertThat(possessionList).hasSize(databaseSizeBeforeCreate + 1);
        Possession testPossession = possessionList.get(possessionList.size() - 1);
        assertThat(testPossession.getNom()).isEqualTo(DEFAULT_NOM);
    }

    @Test
    @Transactional
    public void createPossessionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = possessionRepository.findAll().size();

        // Create the Possession with an existing ID
        possession.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPossessionMockMvc.perform(post("/api/possessions")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(possession)))
            .andExpect(status().isBadRequest());

        // Validate the Possession in the database
        List<Possession> possessionList = possessionRepository.findAll();
        assertThat(possessionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPossessions() throws Exception {
        // Initialize the database
        possessionRepository.saveAndFlush(possession);

        // Get all the possessionList
        restPossessionMockMvc.perform(get("/api/possessions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(possession.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)));
    }
    
    @Test
    @Transactional
    public void getPossession() throws Exception {
        // Initialize the database
        possessionRepository.saveAndFlush(possession);

        // Get the possession
        restPossessionMockMvc.perform(get("/api/possessions/{id}", possession.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(possession.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM));
    }

    @Test
    @Transactional
    public void getNonExistingPossession() throws Exception {
        // Get the possession
        restPossessionMockMvc.perform(get("/api/possessions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePossession() throws Exception {
        // Initialize the database
        possessionRepository.saveAndFlush(possession);

        int databaseSizeBeforeUpdate = possessionRepository.findAll().size();

        // Update the possession
        Possession updatedPossession = possessionRepository.findById(possession.getId()).get();
        // Disconnect from session so that the updates on updatedPossession are not directly saved in db
        em.detach(updatedPossession);
        updatedPossession
            .nom(UPDATED_NOM);

        restPossessionMockMvc.perform(put("/api/possessions")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPossession)))
            .andExpect(status().isOk());

        // Validate the Possession in the database
        List<Possession> possessionList = possessionRepository.findAll();
        assertThat(possessionList).hasSize(databaseSizeBeforeUpdate);
        Possession testPossession = possessionList.get(possessionList.size() - 1);
        assertThat(testPossession.getNom()).isEqualTo(UPDATED_NOM);
    }

    @Test
    @Transactional
    public void updateNonExistingPossession() throws Exception {
        int databaseSizeBeforeUpdate = possessionRepository.findAll().size();

        // Create the Possession

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPossessionMockMvc.perform(put("/api/possessions")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(possession)))
            .andExpect(status().isBadRequest());

        // Validate the Possession in the database
        List<Possession> possessionList = possessionRepository.findAll();
        assertThat(possessionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePossession() throws Exception {
        // Initialize the database
        possessionRepository.saveAndFlush(possession);

        int databaseSizeBeforeDelete = possessionRepository.findAll().size();

        // Delete the possession
        restPossessionMockMvc.perform(delete("/api/possessions/{id}", possession.getId())
            .accept(TestUtil.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Possession> possessionList = possessionRepository.findAll();
        assertThat(possessionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
