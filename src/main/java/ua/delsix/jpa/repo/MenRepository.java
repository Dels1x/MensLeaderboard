package ua.delsix.jpa.repo;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ua.delsix.jpa.entity.Men;

import java.util.List;

public interface MenRepository extends JpaRepository<Men, Integer> {
    List<Men> findAllByOrderByCommentsCountDesc();
    List<Men> findAllByOrderByCommentsCountDesc(Pageable pageable);
    @Query("SELECT m FROM Men m " +
            "ORDER BY m.commentsCount / EXTRACT(DAY FROM AGE(NOW(), m.signedUp)) DESC")
    List<Men> findAllOrderByCommentsPerDayDesc();
    @Query("SELECT m.id FROM Men m")
    List<Long> findAllIds();
}
