// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { getCars, getStations, getDrivers, createBooking, getCustomer } from "../api";

// eslint-disable-next-line react/prop-types
const BookingForm = ({ userId }) => {
    const [options, setOptions] = useState({
        cars: [],
        stations: [],
        drivers: [],
    });
    const [formData, setFormData] = useState({
        carId: "",
        stationId: "",
        driverId: "",
        start_date: "",
    });
    const [customer_id, setCustomerId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCustomerAndData = async () => {
            try {
                console.log(userId);
                const customer = await getCustomer(userId);
                setCustomerId(customer.customer_id);
                console.log(customer);

                const [cars, stations, drivers] = await Promise.all([
                    getCars(),
                    getStations(),
                    getDrivers(),
                ]);

                console.log(drivers); // Лог для проверки данных водителей

                // Преобразуем ключи в объектах drivers, если нужно
                const normalizedDrivers = drivers.map(driver => ({
                    id: driver.driver_id, // Переименование driver_id в id
                    fullName: driver.full_name, // Переименование full_name в fullName
                    topRate: driver.top_rate, // Сохраняем top_rate
                }));

                const normalizedCars = cars.map(car => ({
                    id: car.car_id,
                    model: `${car.make} ${car.model}`,
                    capacity: car.capacity,
                }));

                const normalizedStations = stations.map(station => ({
                    id: station.station_id,
                    name: station.name,
                    location: station.location,
                }));

                setOptions({
                    cars: normalizedCars,
                    stations: normalizedStations,
                    drivers: normalizedDrivers,
                });
            } catch (error) {
                console.error("Ошибка при загрузке данных:", error);
                alert("Не удалось загрузить данные. Попробуйте позже.");
            } finally {
                setLoading(false);
            }
        };

        fetchCustomerAndData();
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { carId, stationId, driverId, start_date } = formData;

        if (!carId || !stationId || !driverId || !start_date) {
            alert("Пожалуйста, заполните все поля перед отправкой формы!");
            return;
        }

        const bookingData = {
            customer_id,
            car_id: Number(carId),
            station_id: Number(stationId),
            driver_id: Number(driverId),
            start_date,
        };

        try {
            console.log(bookingData); // Логируем данные бронирования
            const response = await createBooking(bookingData); // Вызываем функцию

            if (response.message) {
                alert(response.message); // Сообщение об успешном создании
            } else {
                alert("Неизвестный ответ сервера. Проверьте данные."); // Если вдруг нет message
            }
        } catch (error) {
            console.error("Ошибка при создании бронирования:", error.message);
            alert(`Ошибка: ${error.message}`); // Выводим сообщение об ошибке из сервера
        }
    };

    if (loading) {
        return <div>Загрузка данных...</div>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="carId">Выберите машину:</label>
                <select
                    id="carId"
                    name="carId"
                    value={formData.carId}
                    onChange={handleChange}
                >
                    <option value="" disabled>
                        -- Выберите машину --
                    </option>
                    {options.cars.map((car) => (
                        <option key={car.id} value={car.id}>
                            {car.model} (вместимость: {car.capacity})
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="stationId">Выберите станцию:</label>
                <select
                    id="stationId"
                    name="stationId"
                    value={formData.stationId}
                    onChange={handleChange}
                >
                    <option value="" disabled>
                        -- Выберите станцию --
                    </option>
                    {options.stations.map((station) => (
                        <option key={station.id} value={station.id}>
                            {station.name} ({station.location})
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="driverId">Выберите водителя:</label>
                <select
                    id="driverId"
                    name="driverId"
                    value={formData.driverId}
                    onChange={handleChange}
                >
                    <option value="" disabled>
                        -- Выберите водителя --
                    </option>
                    {options.drivers.map((driver) => (
                        <option key={driver.id} value={driver.id}>
                            {driver.fullName}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="start_date">Дата бронирования:</label>
                <input
                    type="date"
                    id="start_date"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleChange}
                />
            </div>

            <button type="submit" disabled={loading}>
                Забронировать
            </button>
        </form>
    );
};

export default BookingForm;
