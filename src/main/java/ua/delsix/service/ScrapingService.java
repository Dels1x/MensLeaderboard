package ua.delsix.service;

import lombok.extern.log4j.Log4j2;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import ua.delsix.exception.NoIdException;
import ua.delsix.jpa.entity.Men;

import java.io.IOException;
import java.time.Instant;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
@Log4j2
public class ScrapingService {
    private static final String MEN_URL = "https://www.hltv.org/profile/%d/mens/";
    private static final String AGENT = "Mozilla 5.0 (not really xd)";


    public Men scrapeMen(int id) throws NoIdException {
        try {
            Document doc = Jsoup.connect(String.format(MEN_URL, id)).userAgent(AGENT).get();
            Elements tables = doc.select("table");

            return buildMen(id,
                    getName(doc),
                    getCountryCode(tables),
                    getCommentsCount(tables),
                    getSignedUpDate(tables));
        } catch (IOException e) {
            handleScrapingError(e);
            throw new NoIdException(e);
        }
    }

    private static void handleScrapingError(IOException e) {
        if (e instanceof org.jsoup.HttpStatusException httpStatusException) {
            log.error("HTTP Status Code: {}", httpStatusException.getStatusCode());
            log.error("Error Message: {}", httpStatusException.getMessage());
        }
    }

    private static Men buildMen(int id, String name, String country, int commentsCount, LocalDate signedUp) {
        return Men.builder()
                .rating(0F).ratedTimes(0)
                .commentsCount(commentsCount)
                .id(id)
                .name(name)
                .signedUp(signedUp)
                .countryCode(country)
                .lastUpdatedAt(Instant.now())
                .build();
    }

    public Men updateMen(Men men) throws NoIdException {
        try {
            Document doc = Jsoup.connect(String.format(MEN_URL, men.getId())).userAgent(AGENT).get();
            Elements tables = doc.select("table");
            men.setCommentsCount(getCommentsCount(tables));
            men.setCountryCode(getCountryCode(tables));

            return men;
        } catch (IOException e) {
            handleScrapingError(e);

            throw new NoIdException(e);
        }
    }

    private static LocalDate getSignedUpDate(Elements tables) {
        DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern(tables.select("span").first().attr("data-time-format"));
        return LocalDate.parse(
                tables.select("span").first().ownText(),
                dateFormat);
    }

    private static int getCommentsCount(Elements tables) {
        return Integer.parseInt(tables.get(1).select("tr").get(2).getElementsByClass("data").first().ownText());
    }

    private static String getCountryCode(Elements tables) {
        String imgSrc = tables.get(0).select("img").first().attr("src");
        return imgSrc.substring(imgSrc.length() - 6, imgSrc.length() - 4);
    }

    private String getName(Document doc) {
        return doc.getElementsByClass("headline").first().ownText();
    }
}
