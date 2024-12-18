package org.spring_boot.cp.bd.project.repository.cars;

import org.spring_boot.cp.bd.project.entity.car.Car;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class CarRowMapper implements RowMapper<Car> {

    @Override
    public Car mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new Car(
                rs.getInt("car_id"),
                rs.getString("make"),
                rs.getString("model"),
                rs.getInt("year"),
                rs.getInt("capacity"),
                rs.getString("status"),
                rs.getString("license_plate")
        );
    }
}
