package ua.delsix.service;

import lombok.extern.log4j.Log4j2;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import ua.delsix.exception.NoIdException;
import ua.delsix.jpa.entity.Men;

import java.io.IOException;
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

            String name = getName(doc);
            String country = getCountryName(tables);
            int commentsCount = getCommentsCount(tables);
            LocalDate signedUp = getSignedUpDate(tables);

            return Men.builder()
                    .rating(0F).ratedTimes(0)
                    .commentsCount(commentsCount)
                    .id(id)
                    .name(name)
                    .signedUp(signedUp)
                    .country(country)
                    .build();
        } catch (IOException e) {
            if (e instanceof org.jsoup.HttpStatusException httpStatusException) {
                log.error("HTTP Status Code: {}", httpStatusException.getStatusCode());
                log.error("Error Message: {}", httpStatusException.getMessage());
            }

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

    private static String getCountryName(Elements tables) {
        return tables.get(0).select("img").first().attr("alt");
    }

    private String getName(Document doc) {
        return doc.getElementsByClass("headline").first().ownText();
    }
}
