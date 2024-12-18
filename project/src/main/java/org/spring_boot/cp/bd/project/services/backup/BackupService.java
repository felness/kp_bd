package org.spring_boot.cp.bd.project.services.backup;

import lombok.RequiredArgsConstructor;
import org.spring_boot.cp.bd.project.entity.backup.Backup;
import org.spring_boot.cp.bd.project.repository.backup.BackUpRepository;
import org.spring_boot.cp.bd.project.repository.backup.DataBaseBackUp;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
public class BackupService {
    private final BackUpRepository backUpRepository;
    private final DataBaseBackUp dataBaseBackUp;

    private final String username = "postgres"; // имя пользователя для бд
    private final String dbName = "project_cp"; // название бд

    public void backUp(UserDetails userDetails) {
        // Генерация уникального имени файла на основе временной метки
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));
        String backupName = String.format("db_backup_%s.dump", timestamp);
        String filePath = String.format("src/main/resources/backup/%s", backupName);

        // Выполнение бэкапа
        int result = dataBaseBackUp.backupDatabase(username, dbName, filePath);

        String status;
        String details;

        if (result == 0) {
            status = "Successfully";
            details = String.format("Backup was made by %s", userDetails.getUsername());
        } else {
            status = "Failed";
            details = "Error during backup process";
        }

        // Сохранение информации о бэкапе в базе данных
        Backup backUp = Backup.builder()
                .backup_name(backupName)
                .backup_time(LocalDateTime.now().toLocalDate())
                .status(status)
                .details(details)
                .build();

        backUpRepository.backUp(backUp);
    }
}
