package org.spring_boot.cp.bd.project.entity.driver;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Data
@Table("drivers")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Driver {

    @Id
    private int driver_id;

    private String full_name;

    private String top_rate;


}
