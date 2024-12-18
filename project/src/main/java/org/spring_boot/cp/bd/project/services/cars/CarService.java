package org.spring_boot.cp.bd.project.services.cars;


import lombok.RequiredArgsConstructor;
import org.spring_boot.cp.bd.project.entity.car.Car;
import org.spring_boot.cp.bd.project.repository.cars.CarsRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CarService {

    private final CarsRepository carsRepository;

    public List<Car> getAll() {
        return carsRepository.getAll();
    }

    public Optional<Car> get(int id) {
        return carsRepository.getCar(id);
    }

    public Optional<Car> save(Car car) {
        return carsRepository.save(car);
    }

    public int updateCar(int id, Car car) {
        return carsRepository.updateCar(id, car);
    }

    public boolean deleteCar(int id) {
        return carsRepository.deleteCar(id);
    }
}
