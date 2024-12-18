package org.spring_boot.cp.bd.project.services.custbookings;


import lombok.RequiredArgsConstructor;
import org.spring_boot.cp.bd.project.entity.booking.Booking;
import org.spring_boot.cp.bd.project.entity.custbooking.CustomerBooking;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ViewBookingService {

    private final JdbcTemplate template;

    public ViewBookingService(JdbcTemplate template) {
        this.template = template;
    }

    public List<CustomerBooking> getAllBookingsPerCustomer() {

        String sql = "SELECT customer_id, email, total_bookings FROM customer_bookings"; // замените на ваше представление
        return template.query(sql, (rs, rowNum) -> new CustomerBooking(
                rs.getInt("customer_id"),
                rs.getString("email"),
                rs.getInt("total_bookings")
        ));

    }
}
