package org.spring_boot.cp.bd.project.controller.cars;


import org.spring_boot.cp.bd.project.entity.car.Car;
import org.spring_boot.cp.bd.project.entity.rental_station.RentalStation;
import org.spring_boot.cp.bd.project.services.cars.CarService;
import org.spring_boot.cp.bd.project.services.stations.StationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cars")
public class CarsController {

    private final CarService carService;

    public CarsController(CarService carService) {
        this.carService = carService;
    }


    @GetMapping
    public List<Car> getAll() {
        return carService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Car> get(@PathVariable int id) {
        Optional<Car> car = carService.get(id);

        return car.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());

    }

    @PostMapping
    public ResponseEntity<Car> add(@RequestBody Car car) {
        Optional<Car> car1 = carService.save(car);

        return car1.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable int id, @RequestBody Car car) {
        car.setCar_id(id);
        carService.updateCar(id, car);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        carService.deleteCar(id);
        return ResponseEntity.noContent().build();
    }
}
