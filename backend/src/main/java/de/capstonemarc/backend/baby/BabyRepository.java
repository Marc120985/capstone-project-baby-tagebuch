package de.capstonemarc.backend.baby;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BabyRepository extends MongoRepository<Baby, String> {
}
