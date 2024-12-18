package org.spring_boot.cp.bd.project.repository.booking;

import org.spring_boot.cp.bd.project.entity.booking.Booking;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class BookingRawMapper implements RowMapper<Booking> {

    @Override
    public Booking mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new Booking(
                rs.getInt("booking_id"),
                rs.getInt("customer_id"),
                rs.getInt("driver_id"),
                rs.getInt("car_id"),
                rs.getInt("station_id"),
                rs.getDate("start_date").toLocalDate()
        );
    }
}
