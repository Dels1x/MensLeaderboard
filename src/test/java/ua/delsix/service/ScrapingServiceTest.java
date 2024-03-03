package ua.delsix.service;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import ua.delsix.exception.NoIdException;
import ua.delsix.jpa.entity.Men;

class ScrapingServiceTest {

    private final ScrapingService scrapingService;

    ScrapingServiceTest() {
        this.scrapingService = new ScrapingService();
    }

    @Test
    void scrapeMen() {
        try {
            Men men = scrapingService.scrapeMen(1707809);
            assertEquals("delsix", men.getName());
        } catch (NoIdException e) {
            throw new RuntimeException(e);
        }
    }
}
