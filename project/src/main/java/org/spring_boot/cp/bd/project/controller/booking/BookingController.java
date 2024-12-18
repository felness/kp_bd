package org.spring_boot.cp.bd.project.controller.booking;


import lombok.RequiredArgsConstructor;
import org.spring_boot.cp.bd.project.entity.booking.Booking;
import org.spring_boot.cp.bd.project.entity.car.Car;
import org.spring_boot.cp.bd.project.entity.driver.Driver;
import org.spring_boot.cp.bd.project.entity.rental_station.RentalStation;
import org.spring_boot.cp.bd.project.infrastructure.aspects.Log;
import org.spring_boot.cp.bd.project.services.bookings.BookingService;
import org.spring_boot.cp.bd.project.services.cars.CarService;
import org.spring_boot.cp.bd.project.services.drivers.DriverService;
import org.spring_boot.cp.bd.project.services.stations.StationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
@Log
public class BookingController {

    private final BookingService bookingService;

    private final CarService carService;

    private final StationService stationService;

    private final DriverService driverService;

    @PostMapping
    public ResponseEntity<Map<String, String>> createBooking(@RequestBody Booking booking) {
        Map<String, String> response = new HashMap<>();
        bookingService.createBooking(booking);
        response.put("message", "Бронирование успешно создано!");
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/drivers")
    public List<Driver> getAllDrivers() {
        return driverService.getAll();
    }

    @GetMapping("/stations")
    public List<RentalStation> getAllStations() {
        return stationService.getAll();
    }

    @GetMapping("/cars")
    public List<Car> getAllCars() {
        return carService.getAll();
    }



}
