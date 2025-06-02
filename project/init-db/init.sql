-- Удаление триггеров и функций, если они существуют
DO $$
    BEGIN
        IF EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_check_car_availability')
        THEN
            IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'bookings') THEN
                EXECUTE 'DROP TRIGGER trg_check_car_availability ON bookings';
            END IF;
        END IF;

        IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'check_car_availability') THEN
            DROP FUNCTION check_car_availability();
        END IF;

        IF EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_check_driver_availability')
        THEN
            IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'bookings') THEN
                EXECUTE 'DROP TRIGGER trg_check_driver_availability ON bookings';
            END IF;
        END IF;

        IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'check_driver_availability') THEN
            DROP FUNCTION check_driver_availability();
        END IF;
    END $$;

-- Удаление представлений, если они существуют
DROP VIEW IF EXISTS customer_bookings;

-- Удаление таблиц в обратном порядке зависимостей
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS routes;
DROP TABLE IF EXISTS cars;
DROP TABLE IF EXISTS drivers;
DROP TABLE IF EXISTS rental_stations;
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS backup;

-- Создание таблиц

-- Пользователи
CREATE TABLE users (
                       user_id SERIAL PRIMARY KEY,
                       username VARCHAR(50) NOT NULL UNIQUE,
                       password_hash VARCHAR(255) NOT NULL,
                       role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'user', 'redactor'))
);

-- Клиенты
CREATE TABLE customers (
                           customer_id SERIAL PRIMARY KEY,
                           user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
                           email VARCHAR(100) NOT NULL
);

-- Водители
CREATE TABLE drivers (
                         driver_id SERIAL PRIMARY KEY,
                         full_name VARCHAR(100) NOT NULL,
                         top_rate VARCHAR(50) NOT NULL UNIQUE
);

-- Автомобили
CREATE TABLE cars (
                      car_id SERIAL PRIMARY KEY,
                      make VARCHAR(50) NOT NULL,
                      model VARCHAR(50) NOT NULL,
                      year INT NOT NULL CHECK (year >= 1900 AND year <= EXTRACT(YEAR FROM CURRENT_DATE)),
                      capacity INT NOT NULL CHECK (capacity > 0),
                      status VARCHAR(20) NOT NULL CHECK (status IN ('available', 'rented', 'under_maintenance')),
                      license_plate VARCHAR(20) NOT NULL UNIQUE
);

-- Станции аренды автомобилей
CREATE TABLE rental_stations (
                                 station_id SERIAL PRIMARY KEY,
                                 name VARCHAR(100) NOT NULL,
                                 location VARCHAR(100) NOT NULL,
                                 capacity INT NOT NULL CHECK (capacity >= 0), -- Максимальное количество автомобилей на станции
                                 current_cars INT NOT NULL DEFAULT 0 CHECK (current_cars >= 0 AND current_cars <= capacity), -- Текущее количество автомобилей
                                 manager_name VARCHAR(100) -- Имя менеджера станции
);

-- Бронирования
CREATE TABLE bookings (
                          booking_id SERIAL PRIMARY KEY,
                          customer_id INT NOT NULL REFERENCES customers(customer_id) ON DELETE CASCADE,
                          driver_id INT REFERENCES drivers(driver_id),
                          car_id INT NOT NULL REFERENCES cars(car_id),
                          station_id INT NOT NULL REFERENCES rental_stations(station_id),
                          start_date TIMESTAMP NOT NULL

);

-- Резервные копии
CREATE TABLE backup (
                        id SERIAL PRIMARY KEY,
                        backup_name VARCHAR(255) NOT NULL,
                        backup_time TIMESTAMP NOT NULL,
                        status VARCHAR(50) NOT NULL,
                        details TEXT
);


-- Функция проверки доступности автомобиля по начальной дате
CREATE OR REPLACE FUNCTION check_car_availability()
    RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM bookings
        WHERE car_id = NEW.car_id
          AND NEW.start_date = start_date
    ) THEN
        RAISE EXCEPTION 'Car is not available for the selected start date.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Триггер проверки доступности автомобиля по начальной дате
CREATE TRIGGER trg_check_car_availability
    BEFORE INSERT OR UPDATE ON bookings
    FOR EACH ROW
EXECUTE FUNCTION check_car_availability();

-- Функция проверки доступности водителя по начальной дате
CREATE OR REPLACE FUNCTION check_driver_availability()
    RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM bookings
        WHERE driver_id = NEW.driver_id
          AND NEW.start_date = start_date
    ) THEN
        RAISE EXCEPTION 'Driver is not available for the selected start date.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Триггер проверки доступности водителя по начальной дате
CREATE TRIGGER trg_check_driver_availability
    BEFORE INSERT OR UPDATE ON bookings
    FOR EACH ROW
EXECUTE FUNCTION check_driver_availability();

-- Представление для аналитики бронирований
CREATE VIEW customer_bookings AS
SELECT
    c.customer_id,
    c.email,
    COUNT(b.booking_id) AS total_bookings
FROM customers c
         LEFT JOIN bookings b ON c.customer_id = b.customer_id
GROUP BY c.customer_id;
