package org.spring_boot.cp.bd.project.services.cars;


import lombok.RequiredArgsConstructor;
import org.spring_boot.cp.bd.project.entity.car.Car;
import org.spring_boot.cp.bd.project.repository.cars.CarsRepository;
import org.spring_boot.cp.bd.project.services.redis.RedisService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CarService {

    private final CarsRepository carsRepository;
    private final RedisService redisService;
    private static final String CARS_CACHE_KEY = "cars:all";

    public List<Car> getAll() {
        return redisService.getCachedList(
            CARS_CACHE_KEY,
            Car.class,
            carsRepository::getAll
        );
    }

    public Optional<Car> get(int id) {
        return carsRepository.getCar(id);
    }

    public Optional<Car> save(Car car) {
        Optional<Car> savedCar = carsRepository.save(car);
        redisService.clearCache(CARS_CACHE_KEY);

        return savedCar;
    }

    public int updateCar(int id, Car car) {
        int updated = carsRepository.updateCar(id, car);
        redisService.clearCache(CARS_CACHE_KEY);
        return updated;
    }

    public boolean deleteCar(int id) {
       boolean deleted = carsRepository.deleteCar(id);
       redisService.clearCache(CARS_CACHE_KEY);
       return deleted;
    }
}
