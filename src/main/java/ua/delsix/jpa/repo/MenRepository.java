package ua.delsix.jpa.repo;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import ua.delsix.jpa.entity.Men;

import java.util.List;

public interface MenRepository extends JpaRepository<Men, Integer> {
    List<Men> findAllByOrderByCommentsCountDesc(Pageable pageable);
}
