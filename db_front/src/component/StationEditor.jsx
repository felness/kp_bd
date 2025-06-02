import { useEffect, useState } from "react";

const StationsEditor = () => {
    const [stations, setStations] = useState([]);
    const [newStation, setNewStation] = useState({
        name: "",
        location: "",
        capacity: "0",
        current_cars: "0",
        manager_name: "",
    });
    const [editingStation, setEditingStation] = useState(null);
    const [message, setMessage] = useState("");
    const url = "http://localhost:8080/api/stations";

    useEffect(() => {
        fetchStations();
    }, []);

    const fetchStations = async () => {
        try {
            console.log('Fetching stations from:', url);
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) throw new Error("Не удалось загрузить станции");
            const data = await response.json();
            console.log('Received stations:', data);
            setStations(data);
        } catch (error) {
            console.error('Error fetching stations:', error);
            setMessage("Ошибка при загрузке станций");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const stationPayload = {
                ...newStation,
                capacity: parseInt(newStation.capacity, 10),
                current_cars: parseInt(newStation.current_cars, 10),
            };

            console.log('Submitting new station:', stationPayload);
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(stationPayload),
            });

            console.log('Response status:', response.status);
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('Error response:', errorData);
                throw new Error(errorData.message || "Не удалось добавить станцию");
            }

            const data = await response.json();
            console.log('Received new station data:', data);
            setStations(prevStations => [...prevStations, data]);
            setNewStation({
                name: "",
                location: "",
                capacity: "0",
                current_cars: "0",
                manager_name: "",
            });
            setMessage("Станция успешно добавлена");
        } catch (error) {
            console.error('Error adding station:', error);
            setMessage(`Ошибка при добавлении станции: ${error.message}`);
        }
    };

    const handleEdit = (station) => {
        setEditingStation(station);
        setNewStation({
            name: station.name,
            location: station.location,
            capacity: station.capacity.toString(),
            current_cars: station.current_cars.toString(),
            manager_name: station.manager_name,
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!editingStation) return;

        try {
            const stationPayload = {
                ...newStation,
                capacity: parseInt(newStation.capacity, 10),
                current_cars: parseInt(newStation.current_cars, 10),
            };

            console.log('Updating station:', editingStation.station_id, stationPayload);
            const response = await fetch(`${url}/${editingStation.station_id}`, {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(stationPayload),
            });

            console.log('Update response status:', response.status);
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('Error response:', errorData);
                throw new Error(errorData.message || "Не удалось обновить станцию");
            }

            await fetchStations();
            setEditingStation(null);
            setNewStation({
                name: "",
                location: "",
                capacity: "0",
                current_cars: "0",
                manager_name: "",
            });
            setMessage("Станция успешно обновлена");
        } catch (error) {
            console.error('Error updating station:', error);
            setMessage(`Ошибка при обновлении станции: ${error.message}`);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Вы уверены, что хотите удалить эту станцию?")) return;

        try {
            console.log('Deleting station:', id);
            const response = await fetch(`${url}/${id}`, {
                method: "DELETE",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            console.log('Delete response status:', response.status);
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('Error response:', errorData);
                throw new Error(errorData.message || "Не удалось удалить станцию");
            }

            setStations(prevStations => prevStations.filter(station => station.station_id !== id));
            setMessage("Станция успешно удалена");
        } catch (error) {
            console.error('Error deleting station:', error);
            setMessage(`Ошибка при удалении станции: ${error.message}`);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ marginBottom: '20px' }}>Редактор станций</h2>
            <form onSubmit={editingStation ? handleUpdate : handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label>Название станции:</label>
                    <input
                        type="text"
                        value={newStation.name}
                        onChange={(e) => setNewStation({ ...newStation, name: e.target.value })}
                        required
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label>Адрес:</label>
                    <input
                        type="text"
                        value={newStation.location}
                        onChange={(e) => setNewStation({ ...newStation, location: e.target.value })}
                        required
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label>Вместимость:</label>
                    <input
                        type="number"
                        value={newStation.capacity}
                        onChange={(e) => setNewStation({ ...newStation, capacity: e.target.value })}
                        required
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label>Текущее количество автомобилей:</label>
                    <input
                        type="number"
                        value={newStation.current_cars}
                        onChange={(e) => setNewStation({ ...newStation, current_cars: e.target.value })}
                        required
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label>Контактный телефон:</label>
                    <input
                        type="tel"
                        value={newStation.manager_name}
                        onChange={(e) => setNewStation({ ...newStation, manager_name: e.target.value })}
                        required
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>

                <button 
                    type="submit"
                    style={{
                        padding: '10px',
                        marginTop: '10px',
                        backgroundColor: '#646cff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    {editingStation ? 'Обновить' : 'Добавить станцию'}
                </button>
            </form>

            <div style={{ marginTop: '30px' }}>
                <h3 style={{ marginBottom: '15px' }}>Список станций</h3>
                <div style={{ display: 'grid', gap: '10px' }}>
                    {stations.map((station) => (
                        <div 
                            key={station.station_id}
                            style={{
                                padding: '15px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <div>
                                <strong>{station.name}</strong>
                                <p>Адрес: {station.location}</p>
                                <p>Вместимость: {station.capacity}</p>
                                <p>Текущее количество: {station.current_cars}</p>
                                <p>Телефон: {station.manager_name}</p>
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button
                                    onClick={() => handleEdit(station)}
                                    style={{
                                        padding: '8px',
                                        backgroundColor: '#646cff',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Редактировать
                                </button>
                                <button
                                    onClick={() => handleDelete(station.station_id)}
                                    style={{
                                        padding: '8px',
                                        backgroundColor: '#ff4d4d',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Удалить
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {message && <p style={{ marginTop: '15px', color: message.includes('ошибка') ? 'red' : 'green' }}>{message}</p>}
        </div>
    );
};

export default StationsEditor;
