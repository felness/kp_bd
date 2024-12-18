package org.spring_boot.cp.bd.project.entity.car;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Data
@Table("cars")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Car {
    @Id
    private int car_id;

    private String make;

    private String model;

    private int year;

    private int capacity;

    private String status;

    private String license_plate;

    public static Car createNew(String make, String model, int year, int capacity, String status, String license_plate) {
      return   Car.builder()
                .make(make)
                .model(model)
                .year(year)
                .capacity(capacity)
                .status(status)
                .license_plate(license_plate)
                .build();
    }
}
