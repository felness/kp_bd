package org.spring_boot.cp.bd.project.repository.drivers;

import org.spring_boot.cp.bd.project.entity.driver.Driver;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class DriverRowMapper implements RowMapper<Driver> {

    @Override
    public Driver mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new Driver(
                rs.getInt("driver_id"),
                rs.getString("full_name"),
                rs.getString("top_rate")
        );
    }
}
