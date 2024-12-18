package org.spring_boot.cp.bd.project.repository.cars;


import lombok.RequiredArgsConstructor;
import org.spring_boot.cp.bd.project.entity.car.Car;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class CarsRepository {

    private final NamedParameterJdbcTemplate template;


    public Optional<Car> getCar(int id) {
        String sql = "SELECT car_id, make, model FROM cars WHERE car_id = :car_id";

        try {
            return Optional.of(template.queryForObject(sql, Map.of("car_id", id), new CarRowMapper()));
        } catch (DataAccessException e) {
            return Optional.empty();
        }

    }

    public List<Car> getAll() {
        String sql = "SELECT * FROM cars";

        return template.query(sql, new CarRowMapper());
    }

    public Optional<Car> save(Car car) {
        String sql = "INSERT INTO cars (make, model, year, capacity, status,  license_plate) VALUES (:make, :model, :year, :capacity, :status, :license_plate) RETURNING car_id";

        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("make", car.getMake())
                .addValue("model", car.getModel())
                .addValue("year", car.getYear())
                .addValue("capacity", car.getCapacity())
                .addValue("status", car.getStatus())
                .addValue("license_plate", car.getLicense_plate());

        // Выполняем вставку и получаем сгенерированный id
        Integer generatedId = template.queryForObject(sql, params, Integer.class);
        car.setCar_id(generatedId); // Устанавливаем сгенерированный id в объекте
        return Optional.of(car); // Возвращаем объект в Optional

    }




    public int updateCar(int id, Car updated) {
        String sql = "UPDATE cars SET car_id = :car_id, make = :make, model = :model, year = :year, capacity = :capacity, status = :status, license_plate = :license_plate  WHERE car_id = :id";

        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("id", id)
                .addValue("car_id", updated.getCar_id())
                .addValue("make", updated.getMake())
                .addValue("model", updated.getModel())
                .addValue("year", updated.getYear())
                .addValue("capacity", updated.getCapacity())
                .addValue("status", updated.getStatus())
                .addValue("license_plate", updated.getLicense_plate());

        return template.update(sql, params);
    }

    public boolean deleteCar(int id) {
        String sql = "DELETE FROM cars WHERE car_id = :car_id";

        return template.update(sql, Map.of("car_id",id)) > 0;
    }
}
