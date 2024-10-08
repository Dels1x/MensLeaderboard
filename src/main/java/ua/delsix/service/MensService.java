package ua.delsix.service;

import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import ua.delsix.exception.NoIdException;
import ua.delsix.jpa.entity.Men;
import ua.delsix.jpa.repo.MenRepository;

import java.time.Duration;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
@Log4j2
public class MensService {
    private final QueueService queueService;
    private final MenRepository menRepository;

    public MensService(QueueService queueService, MenRepository menRepository) {
        this.queueService = queueService;
        this.menRepository = menRepository;
    }

    public void createMen(int id) throws NoIdException {
        log.info("New request to create or update a men with id of {}", id);

        Optional<Men> optionalMen = menRepository.findById(id); // getting an optional of mens
        if (optionalMen.isPresent()) {
            Men men = optionalMen.get();

            // check if at least 4 hours passed since last update, if so - update comments count
            if (Duration.between(men.getLastUpdatedAt(), Instant.now()).toHours() >= 4) {
                updateMen(men);
            }
        } else {
            saveMen(id); // saving mens
        }
    }

    private void saveMen(int id) throws NoIdException {
        Men men = queueService.scrapeMen(id);
        menRepository.save(men);
        log.info("new men {} has been created", men.getName());
    }

    private void updateMen(Men men) throws NoIdException {
        Men newMen = queueService.updateMen(men);
        menRepository.save(newMen);
        log.info("{}'s comments count has been updated from {} to {}",
                men.getName(),
                men.getCommentsCount(),
                newMen.getCommentsCount());
    }

    public List<Men> findAllMens(Pageable pageable) {
        return menRepository.findAllByOrderByCommentsCountDesc(pageable);
    }

    public List<Men> findMensByCountry(String code, PageRequest pageable) {
        log.info("Getting mens for country {}. Pageable: {}", code, pageable.toString());
        return menRepository.findAllByCountryCodeOrderByCommentsCountDesc(code, pageable);
    }

    public List<Long> findAllIds() {
        return menRepository.findAllIds();
    }

    public Men findById(int id) throws NoIdException {
        Optional<Men> optionalMen = menRepository.findById(id);

        if (optionalMen.isPresent()) {
            return optionalMen.get();
        } else {
            throw new NoIdException();
        }
    }

    public int getPagesAmount(int size) {
        return (int) Math.ceil((double) menRepository.count() / size);
    }

    public int findPosition(int targetUserId) {
        List<Men> mens = menRepository.findAllByOrderByCommentsCountDesc();

        // linear search, because mens are sorted by comments, not id
        for (int i = 0; i < mens.size(); i++) {
            if (mens.get(i).getId() == targetUserId) {
                return i + 1;
            }
        }

        return -1;
    }
}
