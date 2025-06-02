package org.spring_boot.cp.bd.project.services.drivers;


import lombok.RequiredArgsConstructor;
import org.spring_boot.cp.bd.project.entity.driver.Driver;
import org.spring_boot.cp.bd.project.repository.drivers.DriverRepository;
import org.spring_boot.cp.bd.project.services.redis.RedisService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DriverService {

    private final DriverRepository driverRepository;
    private final RedisService redisService;
    private static final String DRIVERS_CACHE_KEY = "drivers:all";

    public List<Driver> getAll() {
        return redisService.getCachedList(
                DRIVERS_CACHE_KEY,
                Driver.class,
                driverRepository::getAll
        );
    }

    public Optional<Driver> get(int id) {
        return driverRepository.getDriver(id);
    }

    public Optional<Driver> save(Driver driver) {
        Optional<Driver> saved = driverRepository.save(driver);
        redisService.clearCache(DRIVERS_CACHE_KEY);
        return saved;
    }

    public int updateCar(int id, Driver driver) {
        int updated =  driverRepository.updateDriver(id, driver);
        redisService.clearCache(DRIVERS_CACHE_KEY);
        return updated;
    }

    public boolean deleteCar(int id) {
        boolean deleted =  driverRepository.deleteDriver(id);
        redisService.clearCache(DRIVERS_CACHE_KEY);
        return deleted;
    }
}
