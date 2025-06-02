package org.spring_boot.cp.bd.project.services.stations;


import lombok.RequiredArgsConstructor;
import org.spring_boot.cp.bd.project.entity.car.Car;
import org.spring_boot.cp.bd.project.entity.rental_station.RentalStation;
import org.spring_boot.cp.bd.project.infrastructure.aspects.Log;
import org.spring_boot.cp.bd.project.repository.rental_station.RentalStationRepository;
import org.spring_boot.cp.bd.project.services.redis.RedisService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Log
public class StationService {

    private final RentalStationRepository repository;
    private final RedisService redisService;
    private final String STATIONS_KEY = "stations:all";

    public List<RentalStation> getAll() {
        return redisService.getCachedList(
                STATIONS_KEY,
                RentalStation.class,
                repository::getAll
        );
    }

    public Optional<RentalStation> get(int id) {
        return repository.getById(id);
    }

    public Optional<RentalStation> save(RentalStation station) {
        Optional<RentalStation> saved =  repository.addStation(station);
        redisService.clearCache(STATIONS_KEY);
        return saved;
    }

    public int updateStation(int id, RentalStation station) {
        int updated =  repository.updateStation(id, station);
        redisService.clearCache(STATIONS_KEY);
        return updated;
    }

    public int deleteStation(int id) {
        int deleted = repository.deleteById(id);
        redisService.clearCache(STATIONS_KEY);
        return deleted;
    }
}
