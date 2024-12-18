package org.spring_boot.cp.bd.project.repository.backup;


import org.spring_boot.cp.bd.project.entity.backup.Backup;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class BackUpRepository {
    private final JdbcTemplate jdbcTemplate;

    public BackUpRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void backUp(Backup backUp){
        String sql = "insert into backup(backup_name, backup_time, status, details) values(?, ?, ?, ?)";
        jdbcTemplate.update(sql,backUp.getBackup_name(), backUp.getBackup_time(), backUp.getStatus(), backUp.getDetails());
    }
}
