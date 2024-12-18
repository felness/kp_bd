package org.spring_boot.cp.bd.project.services.stations;


import lombok.RequiredArgsConstructor;
import org.spring_boot.cp.bd.project.entity.car.Car;
import org.spring_boot.cp.bd.project.entity.rental_station.RentalStation;
import org.spring_boot.cp.bd.project.infrastructure.aspects.Log;
import org.spring_boot.cp.bd.project.repository.rental_station.RentalStationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Log
public class StationService {

    private final RentalStationRepository repository;

    public List<RentalStation> getAll() {
        return repository.getAll();
    }

    public Optional<RentalStation> get(int id) {
        return repository.getById(id);
    }

    public Optional<RentalStation> save(RentalStation station) {
        return repository.addStation(station);
    }

    public int updateStation(int id, RentalStation station) {
        return repository.updateStation(id, station);
    }

    public int deleteStation(int id) {
        return repository.deleteById(id);
    }
}
