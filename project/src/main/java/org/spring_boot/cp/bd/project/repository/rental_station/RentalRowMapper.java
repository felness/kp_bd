package org.spring_boot.cp.bd.project.repository.rental_station;

import org.spring_boot.cp.bd.project.entity.rental_station.RentalStation;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class RentalRowMapper implements RowMapper<RentalStation> {

    @Override
    public RentalStation mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new RentalStation(
                rs.getInt("station_id"),
                rs.getString("name"),
                rs.getString("location"),
                rs.getInt("capacity"),
                rs.getInt("current_cars"),
                rs.getString("manager_name")
        );
    }
}
