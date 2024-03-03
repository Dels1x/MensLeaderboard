package ua.delsix.jpa.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.time.LocalDate;

@ToString
@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "men")
public class Men {
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "name", nullable = false, length = 40)
    private String name;

    @Column(name = "comments_count", nullable = false)
    private Integer commentsCount;

    @Column(name = "rating", nullable = false)
    private Float rating;

    @Column(name = "rated_times", nullable = false)
    private Integer ratedTimes;

    @Column(name = "country", nullable = false, length = 56)
    private String country;

    @Column(name = "signed_up", nullable = false)
    private LocalDate signedUp;
}
