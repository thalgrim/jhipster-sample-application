package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterSampleApplicationApp;
import com.mycompany.myapp.domain.Carriere;
import com.mycompany.myapp.repository.CarriereRepository;
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
 * Integration tests for the {@link CarriereResource} REST controller.
 */
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class CarriereResourceIT {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    @Autowired
    private CarriereRepository carriereRepository;

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

    private MockMvc restCarriereMockMvc;

    private Carriere carriere;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CarriereResource carriereResource = new CarriereResource(carriereRepository);
        this.restCarriereMockMvc = MockMvcBuilders.standaloneSetup(carriereResource)
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
    public static Carriere createEntity(EntityManager em) {
        Carriere carriere = new Carriere()
            .nom(DEFAULT_NOM);
        return carriere;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Carriere createUpdatedEntity(EntityManager em) {
        Carriere carriere = new Carriere()
            .nom(UPDATED_NOM);
        return carriere;
    }

    @BeforeEach
    public void initTest() {
        carriere = createEntity(em);
    }

    @Test
    @Transactional
    public void createCarriere() throws Exception {
        int databaseSizeBeforeCreate = carriereRepository.findAll().size();

        // Create the Carriere
        restCarriereMockMvc.perform(post("/api/carrieres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(carriere)))
            .andExpect(status().isCreated());

        // Validate the Carriere in the database
        List<Carriere> carriereList = carriereRepository.findAll();
        assertThat(carriereList).hasSize(databaseSizeBeforeCreate + 1);
        Carriere testCarriere = carriereList.get(carriereList.size() - 1);
        assertThat(testCarriere.getNom()).isEqualTo(DEFAULT_NOM);
    }

    @Test
    @Transactional
    public void createCarriereWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = carriereRepository.findAll().size();

        // Create the Carriere with an existing ID
        carriere.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCarriereMockMvc.perform(post("/api/carrieres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(carriere)))
            .andExpect(status().isBadRequest());

        // Validate the Carriere in the database
        List<Carriere> carriereList = carriereRepository.findAll();
        assertThat(carriereList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCarrieres() throws Exception {
        // Initialize the database
        carriereRepository.saveAndFlush(carriere);

        // Get all the carriereList
        restCarriereMockMvc.perform(get("/api/carrieres?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(carriere.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)));
    }
    
    @Test
    @Transactional
    public void getCarriere() throws Exception {
        // Initialize the database
        carriereRepository.saveAndFlush(carriere);

        // Get the carriere
        restCarriereMockMvc.perform(get("/api/carrieres/{id}", carriere.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(carriere.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM));
    }

    @Test
    @Transactional
    public void getNonExistingCarriere() throws Exception {
        // Get the carriere
        restCarriereMockMvc.perform(get("/api/carrieres/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCarriere() throws Exception {
        // Initialize the database
        carriereRepository.saveAndFlush(carriere);

        int databaseSizeBeforeUpdate = carriereRepository.findAll().size();

        // Update the carriere
        Carriere updatedCarriere = carriereRepository.findById(carriere.getId()).get();
        // Disconnect from session so that the updates on updatedCarriere are not directly saved in db
        em.detach(updatedCarriere);
        updatedCarriere
            .nom(UPDATED_NOM);

        restCarriereMockMvc.perform(put("/api/carrieres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCarriere)))
            .andExpect(status().isOk());

        // Validate the Carriere in the database
        List<Carriere> carriereList = carriereRepository.findAll();
        assertThat(carriereList).hasSize(databaseSizeBeforeUpdate);
        Carriere testCarriere = carriereList.get(carriereList.size() - 1);
        assertThat(testCarriere.getNom()).isEqualTo(UPDATED_NOM);
    }

    @Test
    @Transactional
    public void updateNonExistingCarriere() throws Exception {
        int databaseSizeBeforeUpdate = carriereRepository.findAll().size();

        // Create the Carriere

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCarriereMockMvc.perform(put("/api/carrieres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(carriere)))
            .andExpect(status().isBadRequest());

        // Validate the Carriere in the database
        List<Carriere> carriereList = carriereRepository.findAll();
        assertThat(carriereList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCarriere() throws Exception {
        // Initialize the database
        carriereRepository.saveAndFlush(carriere);

        int databaseSizeBeforeDelete = carriereRepository.findAll().size();

        // Delete the carriere
        restCarriereMockMvc.perform(delete("/api/carrieres/{id}", carriere.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Carriere> carriereList = carriereRepository.findAll();
        assertThat(carriereList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
