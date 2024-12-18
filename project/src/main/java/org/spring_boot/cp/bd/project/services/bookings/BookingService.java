package org.spring_boot.cp.bd.project.services.bookings;


import org.spring_boot.cp.bd.project.entity.booking.Booking;
import org.spring_boot.cp.bd.project.infrastructure.aspects.Log;
import org.spring_boot.cp.bd.project.repository.booking.BookingRepository;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Log
public class BookingService {

    private final BookingRepository repository;

    public BookingService(BookingRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public void createBooking(Booking booking) {
        try {
            repository.save(booking);
        } catch (DataAccessException e) {
            if (e.getMessage() != null && e.getMessage().contains("Car is not available for the selected start date.")) {
                throw new IllegalStateException("Машина недоступна для выбранной даты.");
            } else if (e.getMessage() != null && e.getMessage().contains("Driver is not available for the selected start date.")) {
                throw new IllegalStateException("Водитель недоступен для выбранной даты.");
            } else {
                throw new IllegalStateException("Ошибка при создании бронирования.", e);
            }
        }
    }

}
