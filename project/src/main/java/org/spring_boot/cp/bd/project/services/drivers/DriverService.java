package org.spring_boot.cp.bd.project.services.drivers;


import lombok.RequiredArgsConstructor;
import org.spring_boot.cp.bd.project.entity.driver.Driver;
import org.spring_boot.cp.bd.project.repository.drivers.DriverRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DriverService {

    private final DriverRepository driverRepository;

    public List<Driver> getAll() {
        return driverRepository.getAll();
    }

    public Optional<Driver> get(int id) {
        return driverRepository.getDriver(id);
    }

    public Optional<Driver> save(Driver driver) {
        return driverRepository.save(driver);
    }

    public int updateCar(int id, Driver driver) {
        return driverRepository.updateDriver(id, driver);
    }

    public boolean deleteCar(int id) {
        return driverRepository.deleteDriver(id);
    }
}
