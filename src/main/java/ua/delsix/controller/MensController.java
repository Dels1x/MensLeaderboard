package ua.delsix.controller;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ua.delsix.exception.NoIdException;
import ua.delsix.jpa.entity.Men;
import ua.delsix.service.MensService;

import java.util.List;

@RestController()
@RequestMapping("/mens")
@CrossOrigin(origins = {"https://mens-leaderboard.vercel.app/", "http://localhost:3000"})
public class MensController {
    private final MensService mensService;

    public MensController(MensService mensService) {
        this.mensService = mensService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Men>> getMensByPage(@RequestParam(defaultValue = "0") int page,
                                   @RequestParam(defaultValue = "50") int size) {
        return ResponseEntity.ok().body(mensService.findAllMens(
                PageRequest.of(page,
                        size,
                        Sort.by("commentsCount").descending())));
    }

    @GetMapping("/pos")
    public ResponseEntity<Integer> getPosition(@RequestParam int id) {
        return ResponseEntity.ok().body(mensService.findPosition(id));
    }

    @GetMapping("/ids")
    public ResponseEntity<List<Long>> getAllIds() {
        return ResponseEntity.ok().body(mensService.findAllIds());
    }

    @GetMapping("/pagesAmount")
    public ResponseEntity<Integer> getPagesAmount(@RequestParam(defaultValue = "50") int size) {
        return ResponseEntity.ok().body(mensService.getPagesAmount(size));
    }

    @GetMapping("/get")
    public ResponseEntity<?> getMen(@RequestParam int id) {
        try {
            return ResponseEntity.ok().body(mensService.findById(id));
        } catch (NoIdException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Men not found for id: " + id);
        }
    }

    @PostMapping("/new")
    public ResponseEntity<String> newMen(@RequestParam int id) {
        try {
            mensService.createMen(id);
            return ResponseEntity.ok().body("Men created with id of: " + id);
        } catch (NoIdException e) {
            return ResponseEntity.badRequest().body("Non-existent id: " + id);
        }
    }
}
