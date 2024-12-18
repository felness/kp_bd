package org.spring_boot.cp.bd.project.repository.backup;


import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

@Component
public class DataBaseBackUp {

    public int backupDatabase(String username, String dbName, String outputPath) {
        String backupCommand = String.format(
                "\"C:/Program Files/PostgreSQL/17/bin/pg_dump\" -U %s -d %s -p 5433 -F c -f %s",
                username, dbName, outputPath
        );



        // Убедитесь, что pg_dump доступен в вашем PATH
        ProcessBuilder processBuilder = new ProcessBuilder(backupCommand.split(" "));
        processBuilder.environment().put("PGPASSWORD", "password"); // тут пароль от базы данных

        try {
            Process process = processBuilder.start();
            int exitCode = process.waitFor();

            if (exitCode != 0) {
                try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getErrorStream()))) {
                    String line;
                    while ((line = reader.readLine()) != null) {
                        System.err.println(line);  // Вывод ошибок в консоль
                    }
                }
            }
            return exitCode; // Возвращаем код завершения
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            return -1;
        }
    }
}
