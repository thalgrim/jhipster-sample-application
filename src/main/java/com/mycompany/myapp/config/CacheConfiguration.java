package com.mycompany.myapp.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import org.hibernate.cache.jcache.ConfigSettings;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, com.mycompany.myapp.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, com.mycompany.myapp.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, com.mycompany.myapp.domain.User.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Authority.class.getName());
            createCache(cm, com.mycompany.myapp.domain.User.class.getName() + ".authorities");
            createCache(cm, com.mycompany.myapp.domain.Possession.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Talent.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Competence.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Echelon.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Echelon.class.getName() + ".competences");
            createCache(cm, com.mycompany.myapp.domain.Echelon.class.getName() + ".talents");
            createCache(cm, com.mycompany.myapp.domain.Echelon.class.getName() + ".possessions");
            createCache(cm, com.mycompany.myapp.domain.Carriere.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Carriere.class.getName() + ".echelons");
            createCache(cm, com.mycompany.myapp.domain.Carriere.class.getName() + ".classes");
            createCache(cm, com.mycompany.myapp.domain.Classe.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Classe.class.getName() + ".possessions");
            createCache(cm, com.mycompany.myapp.domain.Race.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Personnage.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Personnage.class.getName() + ".races");
            createCache(cm, com.mycompany.myapp.domain.Personnage.class.getName() + ".carrieres");
            createCache(cm, com.mycompany.myapp.domain.Utilisateur.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Utilisateur.class.getName() + ".personnages");
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache != null) {
            cm.destroyCache(cacheName);
        }
        cm.createCache(cacheName, jcacheConfiguration);
    }

}
