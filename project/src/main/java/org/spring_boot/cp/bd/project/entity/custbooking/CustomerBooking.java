package org.spring_boot.cp.bd.project.entity.custbooking;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Data
@Table("customer_bookings")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CustomerBooking {

    @Id
    private int customer_id;

    private String email;

    private int total_bookings;
}
