package org.spring_boot.cp.bd.project.controller.station;


import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.spring_boot.cp.bd.project.entity.rental_station.RentalStation;
import org.spring_boot.cp.bd.project.infrastructure.aspects.Log;
import org.spring_boot.cp.bd.project.services.stations.StationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/stations")
@RequiredArgsConstructor
@Log
public class StationController {
    private final StationService service;


    @GetMapping
    public List<RentalStation> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<RentalStation> get(@PathVariable int id) {
        Optional<RentalStation> station = service.get(id);

        return station.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());

    }

    @PostMapping
    public ResponseEntity<RentalStation> add(@RequestBody RentalStation station) {
        Optional<RentalStation> station1 = service.save(station);

        return station1.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable int id, @RequestBody RentalStation station) {
        station.setStation_id(id);
        service.updateStation(id, station);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        service.deleteStation(id);
        return ResponseEntity.noContent().build();
    }


}
