import { useEffect, useState } from "react";

const DriversEditor = () => {
    const [drivers, setDrivers] = useState([]);
    const [newDriver, setNewDriver] = useState({
        full_name: "",
        top_rate: "0"
    });
    const [editingDriver, setEditingDriver] = useState(null);
    const [message, setMessage] = useState("");
    const url = "http://localhost:8080/api/drivers";

    useEffect(() => {
        fetchDrivers();
    }, []);

    const fetchDrivers = async () => {
        try {
            console.log('Fetching drivers from:', url);
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) throw new Error("Не удалось загрузить водителей");
            const data = await response.json();
            console.log('Received drivers:', data);
            setDrivers(data);
        } catch (error) {
            console.error('Error fetching drivers:', error);
            setMessage("Ошибка при загрузке водителей");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Submitting new driver:', newDriver);
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newDriver),
            });

            console.log('Response status:', response.status);
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('Error response:', errorData);
                throw new Error(errorData.message || "Не удалось добавить водителя");
            }

            const data = await response.json();
            console.log('Received new driver data:', data);
            setDrivers(prevDrivers => [...prevDrivers, data]);
            setNewDriver({
                full_name: "",
                top_rate: "0"
            });
            setMessage("Водитель успешно добавлен");
        } catch (error) {
            console.error('Error adding driver:', error);
            setMessage(`Ошибка при добавлении водителя: ${error.message}`);
        }
    };

    const handleEdit = (driver) => {
        setEditingDriver(driver);
        setNewDriver({
            full_name: driver.full_name,
            top_rate: driver.top_rate
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!editingDriver) return;

        try {
            console.log('Updating driver:', editingDriver.driver_id, newDriver);
            const response = await fetch(`${url}/${editingDriver.driver_id}`, {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newDriver),
            });

            console.log('Update response status:', response.status);
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('Error response:', errorData);
                throw new Error(errorData.message || "Не удалось обновить водителя");
            }

            await fetchDrivers();
            setEditingDriver(null);
            setNewDriver({
                full_name: "",
                top_rate: "0"
            });
            setMessage("Водитель успешно обновлен");
        } catch (error) {
            console.error('Error updating driver:', error);
            setMessage(`Ошибка при обновлении водителя: ${error.message}`);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Вы уверены, что хотите удалить этого водителя?")) return;

        try {
            console.log('Deleting driver:', id);
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
                throw new Error(errorData.message || "Не удалось удалить водителя");
            }

            setDrivers(prevDrivers => prevDrivers.filter(driver => driver.driver_id !== id));
            setMessage("Водитель успешно удален");
        } catch (error) {
            console.error('Error deleting driver:', error);
            setMessage(`Ошибка при удалении водителя: ${error.message}`);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ marginBottom: '20px' }}>Редактор водителей</h2>
            <form onSubmit={editingDriver ? handleUpdate : handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label>ФИО водителя:</label>
                    <input
                        type="text"
                        value={newDriver.full_name}
                        onChange={(e) => setNewDriver({ ...newDriver, full_name: e.target.value })}
                        required
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label>Рейтинг:</label>
                    <input
                        type="number"
                        value={newDriver.top_rate}
                        onChange={(e) => setNewDriver({ ...newDriver, top_rate: e.target.value })}
                        required
                        min="0"
                        max="5"
                        step="0.1"
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
                    {editingDriver ? 'Обновить' : 'Добавить водителя'}
                </button>
            </form>

            <div style={{ marginTop: '30px' }}>
                <h3 style={{ marginBottom: '15px' }}>Список водителей</h3>
                <div style={{ display: 'grid', gap: '10px' }}>
                    {drivers.map((driver) => (
                        <div 
                            key={driver.driver_id}
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
                                <strong>{driver.full_name}</strong>
                                <p>Рейтинг: {driver.top_rate}</p>
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button
                                    onClick={() => handleEdit(driver)}
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
                                    onClick={() => handleDelete(driver.driver_id)}
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

export default DriversEditor;
