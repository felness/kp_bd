package org.spring_boot.cp.bd.project.controller.custbookings;


import org.spring_boot.cp.bd.project.entity.custbooking.CustomerBooking;
import org.spring_boot.cp.bd.project.services.custbookings.ViewBookingService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/cust-bookings")
public class CustomerBookingController {

    private final ViewBookingService bookingService;

    public CustomerBookingController(ViewBookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping
    public List<CustomerBooking> getAll() {
        return bookingService.getAllBookingsPerCustomer();
    }
}
