import { useEffect, useState } from "react";

const CarsEditor = () => {
    const [cars, setCars] = useState([]);
    const [newCar, setNewCar] = useState({
        make: "",
        model: "",
        year: "",
        capacity: "",
        status: "available",
        license_plate: "",
    });
    const [editingCar, setEditingCar] = useState(null);
    const [message, setMessage] = useState("");
    const url = 'http://localhost:8080/api/cars';

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            console.log('Fetching cars from:', url);
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) throw new Error("Failed to load cars");
            const data = await response.json();
            console.log('Received cars:', data);
            setCars(data);
        } catch (error) {
            console.error('Error fetching cars:', error);
            setMessage("Ошибка при загрузке автомобилей");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Преобразуем числовые поля
            const carPayload = {
                ...newCar,
                year: parseInt(newCar.year, 10),
                capacity: parseInt(newCar.capacity, 10)
            };

            console.log('Submitting new car:', carPayload);
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(carPayload),
            });

            console.log('Response status:', response.status);
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('Error response:', errorData);
                throw new Error(errorData.message || "Не удалось добавить автомобиль");
            }

            const data = await response.json();
            console.log('Received new car data:', data);
            setCars(prevCars => [...prevCars, data]);
            setNewCar({
                make: "",
                model: "",
                year: "",
                capacity: "",
                status: "available",
                license_plate: "",
            });
            setMessage("Автомобиль успешно добавлен");
        } catch (error) {
            console.error('Error adding car:', error);
            setMessage(`Ошибка при добавлении автомобиля: ${error.message}`);
        }
    };

    const handleEdit = (car) => {
        setEditingCar(car);
        setNewCar({
            make: car.make,
            model: car.model,
            year: car.year.toString(),
            capacity: car.capacity.toString(),
            status: car.status,
            license_plate: car.license_plate,
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!editingCar) return;

        try {
            // Преобразуем числовые поля
            const carPayload = {
                ...newCar,
                year: parseInt(newCar.year, 10),
                capacity: parseInt(newCar.capacity, 10)
            };

            console.log('Updating car:', editingCar.car_id, carPayload);
            const response = await fetch(`${url}/${editingCar.car_id}`, {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(carPayload),
            });

            console.log('Update response status:', response.status);
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('Error response:', errorData);
                throw new Error(errorData.message || "Не удалось обновить автомобиль");
            }

            await fetchCars();
            setEditingCar(null);
            setNewCar({
                make: "",
                model: "",
                year: "",
                capacity: "",
                status: "available",
                license_plate: "",
            });
            setMessage("Автомобиль успешно обновлен");
        } catch (error) {
            console.error('Error updating car:', error);
            setMessage(`Ошибка при обновлении автомобиля: ${error.message}`);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Вы уверены, что хотите удалить этот автомобиль?")) return;

        try {
            console.log('Deleting car:', id);
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
                throw new Error(errorData.message || "Не удалось удалить автомобиль");
            }

            setCars(prevCars => prevCars.filter(car => car.car_id !== id));
            setMessage("Автомобиль успешно удален");
        } catch (error) {
            console.error('Error deleting car:', error);
            setMessage(`Ошибка при удалении автомобиля: ${error.message}`);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ marginBottom: '20px' }}>Редактор автомобилей</h2>
            <form onSubmit={editingCar ? handleUpdate : handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label>Марка:</label>
                    <input
                        type="text"
                        value={newCar.make}
                        onChange={(e) => setNewCar({ ...newCar, make: e.target.value })}
                        required
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label>Модель:</label>
                    <input
                        type="text"
                        value={newCar.model}
                        onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
                        required
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label>Год выпуска:</label>
                    <input
                        type="number"
                        value={newCar.year}
                        onChange={(e) => setNewCar({ ...newCar, year: e.target.value })}
                        required
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label>Вместимость:</label>
                    <input
                        type="number"
                        value={newCar.capacity}
                        onChange={(e) => setNewCar({ ...newCar, capacity: e.target.value })}
                        required
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label>Гос. номер:</label>
                    <input
                        type="text"
                        value={newCar.license_plate}
                        onChange={(e) => setNewCar({ ...newCar, license_plate: e.target.value })}
                        required
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label>Статус:</label>
                    <select
                        value={newCar.status}
                        onChange={(e) => setNewCar({ ...newCar, status: e.target.value })}
                        required
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    >
                        <option value="available">Доступен</option>
                        <option value="rented">Арендован</option>
                        <option value="under_maintenance">На обслуживании</option>
                    </select>
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
                    {editingCar ? 'Обновить' : 'Добавить'}
                </button>
            </form>

            <div style={{ marginTop: '30px' }}>
                <h3 style={{ marginBottom: '15px' }}>Список автомобилей</h3>
                <div style={{ display: 'grid', gap: '10px' }}>
                    {cars.map((car) => (
                        <div 
                            key={car.car_id}
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
                                <strong>{car.make} {car.model}</strong>
                                <p>Год: {car.year}</p>
                                <p>Номер: {car.license_plate}</p>
                                <p>Статус: {car.status}</p>
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button
                                    onClick={() => handleEdit(car)}
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
                                    onClick={() => handleDelete(car.car_id)}
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

export default CarsEditor;