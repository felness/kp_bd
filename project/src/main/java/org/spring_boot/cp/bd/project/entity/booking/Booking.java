package org.spring_boot.cp.bd.project.entity.booking;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDate;

@Data
@Table("bookings")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Booking {

    @Id
    private int booking_id;

    private int customer_id;

    private int driver_id;

    private int car_id;

    private int station_id;

    private LocalDate start_date;






}
