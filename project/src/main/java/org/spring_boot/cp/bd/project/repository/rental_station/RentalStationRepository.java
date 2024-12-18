package org.spring_boot.cp.bd.project.repository.rental_station;


import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.spring_boot.cp.bd.project.entity.rental_station.RentalStation;
import org.spring_boot.cp.bd.project.infrastructure.aspects.Log;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class RentalStationRepository {

    private static final Logger log = LoggerFactory.getLogger(RentalStationRepository.class);
    private final NamedParameterJdbcTemplate template;

    public Optional<RentalStation> getById(int id) {
        final String sql = "SELECT * from rental_stations WHERE station_id = :station_id";
        return Optional.of(template.queryForObject(sql, Map.of("station_id", id), new RentalRowMapper()));
    }

    public List<RentalStation> getAll() {
        final String sql = "SELECT * FROM rental_stations ORDER BY station_id";

        return template.query(sql, new RentalRowMapper());

    }

    public int deleteById(int id) {
        final String sql = "DELETE FROM rental_stations WHERE station_id = :station_id";
        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("station_id", id);

        return template.update(sql, params);
    }

    public int updateStation(int id, RentalStation updated) {
        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("id", id)
                .addValue("name", updated.getName())
                .addValue("location",updated.getLocation())
                .addValue("capacity", updated.getCapacity())
                .addValue("current_cars", updated.getCurrent_cars())
                .addValue("manager_name", updated.getManager_name());

        final String sql = "UPDATE rental_stations SET name = :name, location = :location, capacity = :capacity, current_cars = :current_cars, manager_name = :manager_name WHERE station_id = :id";

        return template.update(sql, params);
    }
    @Log
    public Optional<RentalStation> addStation(RentalStation station) {
        final String sql = "INSERT INTO rental_stations (name, location, capacity, current_cars, manager_name) " +
                "VALUES (:name, :location, :capacity, :current_cars, :manager_name) RETURNING station_id";

        MapSqlParameterSource parameterSource = new MapSqlParameterSource()
                .addValue("name", station.getName())
                .addValue("location", station.getLocation())
                .addValue("capacity", station.getCapacity())
                .addValue("current_cars", station.getCurrent_cars())
                .addValue("manager_name", station.getManager_name());

        try {
            Integer generatedId = template.queryForObject(sql, parameterSource, Integer.class);

            station.setStation_id(generatedId); // Устанавливаем сгенерированный id в объект
            return Optional.of(station);
        } catch (DataAccessException e) {
            log.info("Ошибка в репе в методе добавления объект станции: " + station);
            return Optional.empty();
        }
    }
}
