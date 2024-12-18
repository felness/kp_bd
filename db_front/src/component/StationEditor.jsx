import { useEffect, useState } from "react";

const StationsEditor = () => {
    const [stations, setStations] = useState([]);
    const [newStation, setNewStation] = useState({
        name: "",
        location: "",
        capacity: 0,
        current_cars: 0,
        manager_name: "",
    });
    const url = "http://localhost:8080/api/stations";

    // Загрузка списка станций при монтировании компонента
    useEffect(() => {
        fetch(url)
            .then((response) => {
                if (!response.ok) throw new Error("Не удалось загрузить станции");
                return response.json();
            })
            .then((data) => setStations(data))
            .catch((error) => console.error(error));
    }, []);

    // Обновление поля при редактировании
    const handleEditChange = (id, field, value) => {
        // Приводим значения capacity и current_cars к числовому типу
        if (field === "capacity" || field === "current_cars") {
            value = parseInt(value, 10); // Преобразуем в число
        }
        setStations((prevStations) =>
            prevStations.map((station) =>
                station.station_id === id ? { ...station, [field]: value } : station
            )
        );
    };

    // Сохранение изменений станции
    const handleSave = (id) => {
        const updatedStation = stations.find((station) => station.station_id === id);
        fetch(`${url}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedStation),
        })
            .then((response) => {
                if (!response.ok) throw new Error("Не удалось обновить станцию");
                alert("Станция успешно обновлена!");
            })
            .catch((error) => console.error(error));
    };

    // Удаление станции
    const handleDelete = (id) => {
        fetch(`${url}/${id}`, { method: "DELETE" })
            .then((response) => {
                if (!response.ok) throw new Error("Не удалось удалить станцию");
                setStations((prevStations) => prevStations.filter((station) => station.station_id !== id));
            })
            .catch((error) => console.error(error));
    };

    // Добавление новой станции
    const handleAdd = () => {
        const stationPayload = {
            ...newStation,
            capacity: parseInt(newStation.capacity, 10), // Преобразуем в число
            current_cars: parseInt(newStation.current_cars, 10), // Преобразуем в число
        };
        console.log("Отправляемый JSON:", JSON.stringify(stationPayload)); // Вывод в консоль

        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(stationPayload),
        })
            .then((response) => {
                if (!response.ok) throw new Error("Не удалось добавить станцию");
                return response.json();
            })
            .then((data) => {
                setStations((prevStations) => [...prevStations, data]);
                setNewStation({
                    name: "",
                    location: "",
                    capacity: 0,
                    current_cars: 0,
                    manager_name: "",
                }); // Сброс формы
            })
            .catch((error) => console.error(error));
    };

    return (
        <div>
            <h2>Редактор станций</h2>
            <div>
                {stations.map((station) => (
                    <div
                        key={station.station_id}
                        style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}
                    >
                        <h3>Станция #{station.station_id}</h3>
                        <label>
                            Название:
                            <input
                                type="text"
                                value={station.name}
                                onChange={(e) => handleEditChange(station.station_id, "name", e.target.value)}
                            />
                        </label>
                        <label>
                            Локация:
                            <input
                                type="text"
                                value={station.location}
                                onChange={(e) => handleEditChange(station.station_id, "location", e.target.value)}
                            />
                        </label>
                        <label>
                            Вместимость:
                            <input
                                type="number"
                                value={station.capacity}
                                onChange={(e) => handleEditChange(station.station_id, "capacity", e.target.value)}
                            />
                        </label>
                        <label>
                            Текущие машины:
                            <input
                                type="number"
                                value={station.current_cars}
                                onChange={(e) => handleEditChange(station.station_id, "current_cars", e.target.value)}
                            />
                        </label>
                        <label>
                            Менеджер:
                            <input
                                type="text"
                                value={station.manager_name}
                                onChange={(e) => handleEditChange(station.station_id, "manager_name", e.target.value)}
                            />
                        </label>
                        <button onClick={() => handleSave(station.station_id)}>Сохранить</button>
                        <button onClick={() => handleDelete(station.station_id)}>Удалить</button>
                    </div>
                ))}
            </div>

            <h3>Добавить новую станцию</h3>
            <div style={{ border: "1px solid #ccc", padding: "10px" }}>
                <label>
                    Название:
                    <input
                        type="text"
                        value={newStation.name}
                        onChange={(e) => setNewStation({ ...newStation, name: e.target.value })}
                    />
                </label>
                <label>
                    Локация:
                    <input
                        type="text"
                        value={newStation.location}
                        onChange={(e) => setNewStation({ ...newStation, location: e.target.value })}
                    />
                </label>
                <label>
                    Вместимость:
                    <input
                        type="number"
                        value={newStation.capacity}
                        onChange={(e) => setNewStation({ ...newStation, capacity: e.target.value })}
                    />
                </label>
                <label>
                    Текущие машины:
                    <input
                        type="number"
                        value={newStation.current_cars}
                        onChange={(e) => setNewStation({ ...newStation, current_cars: e.target.value })}
                    />
                </label>
                <label>
                    Менеджер:
                    <input
                        type="text"
                        value={newStation.manager_name}
                        onChange={(e) => setNewStation({ ...newStation, manager_name: e.target.value })}
                    />
                </label>
                <button onClick={handleAdd}>Добавить станцию</button>
            </div>
        </div>
    );
};

export default StationsEditor;
