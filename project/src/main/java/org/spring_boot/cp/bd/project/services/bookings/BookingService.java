package org.spring_boot.cp.bd.project.services.bookings;


import lombok.RequiredArgsConstructor;
import org.spring_boot.cp.bd.project.config.redis.publisher.NotificationPublisher;
import org.spring_boot.cp.bd.project.config.redis.publisher.dto.NotificationEvent;
import org.spring_boot.cp.bd.project.entity.booking.Booking;
import org.spring_boot.cp.bd.project.infrastructure.aspects.Log;
import org.spring_boot.cp.bd.project.repository.booking.BookingRepository;
import org.spring_boot.cp.bd.project.services.redis.RedisService;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@Log
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository repository;
    private final NotificationPublisher notificationPublisher;

    @Transactional
    public void createBooking(Booking booking) {
        try {
            repository.save(booking);
            NotificationEvent notificationEvent = new NotificationEvent();
            notificationEvent.setType("Бронирование успешно создано!");
            notificationEvent.setMessage("Время бронирования: " + LocalDateTime.now());
            notificationPublisher.publishEvent("notifications", notificationEvent);

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
