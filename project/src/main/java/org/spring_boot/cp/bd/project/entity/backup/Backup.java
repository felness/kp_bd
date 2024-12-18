package org.spring_boot.cp.bd.project.entity.backup;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDate;

@Data
@Table("backup")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Backup {

    @Id
    private int id;

    private String backup_name;

    private LocalDate backup_time;

    private String status;

    private String details;
}
