package org.spring_boot.cp.bd.project.config.redis.publisher;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.spring_boot.cp.bd.project.config.redis.publisher.dto.NotificationEvent;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class NotificationPublisher {

    private final RedisTemplate<String, Object> redisTemplate;

    public void publishEvent(String channel, NotificationEvent event) {
        try {
            redisTemplate.convertAndSend(channel, event);
            log.info("Published event to channel {}: {}", channel, event);
        } catch (Exception e) {
            log.error("Failed to publish event: {}", e.getMessage());
        }
    }
}
