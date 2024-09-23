package ua.delsix.jpa.repo;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ua.delsix.jpa.entity.Men;

import java.util.List;

@Repository
public interface MenRepository extends JpaRepository<Men, Integer> {
    List<Men> findAllByOrderByCommentsCountDesc();
    List<Men> findAllByOrderByCommentsCountDesc(Pageable pageable);
    List<Men> findAllByCountryCodeOrderByCommentsCountDesc(String countryCode, Pageable pageable);
    @Query("SELECT m.id FROM Men m")
    List<Long> findAllIds();
}
