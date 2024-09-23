package ua.delsix.service;

import org.springframework.stereotype.Service;
import ua.delsix.exception.NoIdException;
import ua.delsix.jpa.entity.Men;

@Service
public class QueueService {
    private final ScrapingService scrapingService;

    public QueueService(ScrapingService scrapingService) {
        this.scrapingService = scrapingService;
    }

    public synchronized Men scrapeMen(int id) throws NoIdException {
        coolDown();
        return scrapingService.scrapeMen(id);
    }

    public synchronized Men updateMen(Men men) throws NoIdException {
        coolDown();
        return scrapingService.updateMen(men);
    }

    private synchronized void coolDown() {
        try {
            Thread.sleep(400);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
}
