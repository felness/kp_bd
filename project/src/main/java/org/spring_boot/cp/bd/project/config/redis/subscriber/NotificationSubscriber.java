package org.spring_boot.cp.bd.project.config.redis.subscriber;


import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.spring_boot.cp.bd.project.config.redis.publisher.dto.NotificationEvent;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class NotificationSubscriber {


    private final SimpMessagingTemplate messagingTemplate;

    public void onMessage(NotificationEvent event, String channel) {
        try {
            log.info("Received message from Redis channel {}: {}", channel, event);
            log.info("Deserialized event: {}", event);
            messagingTemplate.convertAndSend("/topic/notifications", event);
        } catch (Exception e) {
            log.error("Failed to process Redis message: {}", e.getMessage());
        }
    }
}
