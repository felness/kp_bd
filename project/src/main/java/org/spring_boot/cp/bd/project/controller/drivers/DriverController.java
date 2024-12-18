package org.spring_boot.cp.bd.project.controller.drivers;


import org.spring_boot.cp.bd.project.entity.driver.Driver;
import org.spring_boot.cp.bd.project.entity.rental_station.RentalStation;
import org.spring_boot.cp.bd.project.services.drivers.DriverService;
import org.spring_boot.cp.bd.project.services.stations.StationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/drivers")
public class DriverController {
    private final DriverService driverService;

    public DriverController(DriverService driverService) {
        this.driverService = driverService;
    }


    @GetMapping
    public List<Driver> getAll() {
        return driverService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Driver> get(@PathVariable int id) {
        Optional<Driver> driver = driverService.get(id);

        return driver.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());

    }

    @PostMapping
    public ResponseEntity<Driver> add(@RequestBody Driver driver) {
        Optional<Driver> driver1 = driverService.save(driver);

        return driver1.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable int id, @RequestBody Driver driver) {
        driver.setDriver_id(id);
        driverService.updateCar(id, driver);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        driverService.deleteCar(id);
        return ResponseEntity.noContent().build();
    }
}
