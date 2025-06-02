package org.spring_boot.cp.bd.project.services.redis;

import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.spring_boot.cp.bd.project.config.redis.RedisCacheUtil;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
@Log
@RequiredArgsConstructor
public class RedisService {

    private final RedisCacheUtil redisCacheUtil;

    private static final long CACHE_TTL_MINUTES = 10;

    public <T> List<T> getCachedList(String cacheKey, Class<T> clazz, java.util.function.Supplier<List<T>> supplier) {

        List<T> cachedList = redisCacheUtil.getCachedList(cacheKey, clazz);
        if (cachedList != null) {
            return cachedList;
        }

        // Запрашиваем данные из сервиса
        List<T> data = supplier.get();

        // Сохраняем в кэш
        redisCacheUtil.cacheList(cacheKey, data, CACHE_TTL_MINUTES, TimeUnit.MINUTES);

        return data;
    }

    public void clearCache(String cacheKey) {
        redisCacheUtil.clearCache(cacheKey);
    }
}