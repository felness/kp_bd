package org.spring_boot.cp.bd.project.entity.rental_station;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Data
@Table("rental_stations")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class RentalStation {

    @Id
    private int station_id;

    private String name;


    private String location;

    private int capacity;

    private int current_cars;

    private String manager_name;

}
