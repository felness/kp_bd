package org.spring_boot.cp.bd.project.repository.drivers;


import lombok.RequiredArgsConstructor;
import org.spring_boot.cp.bd.project.entity.driver.Driver;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class DriverRepository {

    private final NamedParameterJdbcTemplate template;

    public Optional<Driver> getDriver(int id) {
        String sql = "SELECT driver_id, full_name, top_rate FROM drivers WHERE driver_id = :id";

        try {
            return Optional.of(template.queryForObject(sql, Map.of("id", id), new DriverRowMapper()));
        } catch (DataAccessException e) {
            return Optional.empty();
        }

    }

    public List<Driver> getAll() {
        String sql = "SELECT * FROM drivers";

        return template.query(sql, new DriverRowMapper());
    }

    public Optional<Driver> save(Driver driver) {
        String sql = "INSERT INTO drivers (full_name, top_rate) VALUES (:full_name, :top_rate) RETURNING driver_id";

        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("full_name", driver.getFull_name())
                .addValue("top_rate",driver.getTop_rate());

        // Выполняем вставку и получаем сгенерированный id
        Integer generatedId = template.queryForObject(sql, params, Integer.class);
        driver.setDriver_id(generatedId); // Устанавливаем сгенерированный id в объекте
        return Optional.of(driver); // Возвращаем объект в Optional

    }




    public int updateDriver(int id, Driver updated) {
        String sql = "UPDATE drivers SET driver_id = :driver_id, full_name = :full_name, top_rate = :top_rate WHERE driver_id = :id";

        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("id", id)
                .addValue("driver_id", updated.getDriver_id())
                .addValue("full_name", updated.getFull_name())
                .addValue("top_rate", updated.getTop_rate());

        return template.update(sql, params);
    }

    public boolean deleteDriver(int id) {
        String sql = "DELETE FROM drivers WHERE driver_id = :driver_id";

        return template.update(sql, Map.of("driver_id",id)) > 0;
    }
}
