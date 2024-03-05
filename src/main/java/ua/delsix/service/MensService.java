package ua.delsix.service;

import lombok.extern.log4j.Log4j2;
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
    private final ScrapingService scrapingService;
    private final MenRepository menRepository;

    public MensService(ScrapingService scrapingService, MenRepository menRepository) {
        this.scrapingService = scrapingService;
        this.menRepository = menRepository;
    }

    public void createMen(int id) throws NoIdException {
        Optional<Men> optionalMen = menRepository.findById(id); // getting an optional of mens
        if (optionalMen.isPresent()) {
            Men men = optionalMen.get();

            // check if at least 4 hours passed since last update, if so - update comments count
            if (Duration.between(men.getLastUpdatedAt(), Instant.now()).toHours() >= 4) {
                men.setCommentsCount(scrapingService.scrapeComments(id));

                menRepository.save(men);
            }
        } else {
            menRepository.save(scrapingService.scrapeMen(id)); // saving mens
        }
    }

    public List<Men> findAllMensByPageAndSize(Pageable pageable) {
        return menRepository.findAllByOrderByCommentsCountDesc(pageable);
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
}
