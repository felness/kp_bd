package org.spring_boot.cp.bd.project.controller.backup;


import org.spring_boot.cp.bd.project.infrastructure.aspects.Log;
import org.spring_boot.cp.bd.project.services.backup.BackupService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/backup")
@Log
public class BackupController {

    private final BackupService backupService;


    public BackupController(BackupService backupService) {
        this.backupService = backupService;
    }

    @PostMapping
    public ResponseEntity<String> backup(@AuthenticationPrincipal UserDetails userDetails) {
        backupService.backUp(userDetails);
        return ResponseEntity.ok("Backup was completed!!!");
    }
}
