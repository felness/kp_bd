package org.spring_boot.cp.bd.project.repository.booking;


import lombok.RequiredArgsConstructor;
import org.spring_boot.cp.bd.project.entity.booking.Booking;
import org.spring_boot.cp.bd.project.infrastructure.aspects.Log;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
@Log
public class BookingRepository {

    private final NamedParameterJdbcTemplate template;

    public void save(Booking booking) {
        String sql = "INSERT INTO bookings(customer_id, driver_id, car_id, station_id, start_date) VALUES(:v1, :v2, :v3, :v4, :v5)";

        MapSqlParameterSource map = new MapSqlParameterSource()
                .addValue("v1", booking.getCustomer_id())
                .addValue("v2", booking.getDriver_id())
                .addValue("v3", booking.getCar_id())
                .addValue("v4", booking.getStation_id())
                .addValue("v5", booking.getStart_date());


        template.update(sql, map);
    }
}
