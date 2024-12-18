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
    const url = 'http://localhost:8080/api/cars';

    // Load car list when component mounts
    useEffect(() => {
        fetch(url)
            .then((response) => {
                if (!response.ok) throw new Error("Failed to load cars");
                return response.json();
            })
            .then((data) => setCars(data))
            .catch((error) => console.error(error));
    }, []);

    // Update a field value for editing
    const handleEditChange = (id, field, value) => {
        setCars((prevCars) =>
            prevCars.map((car) =>
                car.car_id === id ? { ...car, [field]: value } : car
            )
        );
    };

    // Save car changes
    const handleSave = (id) => {
        const updatedCar = cars.find((car) => car.car_id === id);
        fetch(`${url}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedCar),
        })
            .then((response) => {
                if (!response.ok) throw new Error("Failed to update car");
                alert("Car updated successfully!");
            })
            .catch((error) => console.error(error));
    };

    // Delete a car
    const handleDelete = (id) => {
        fetch(`${url}/${id}`, { method: "DELETE" })
            .then((response) => {
                if (!response.ok) throw new Error("Failed to delete car");
                setCars((prevCars) => prevCars.filter((car) => car.car_id !== id));
            })
            .catch((error) => console.error(error));
    };

    // Add a new car
    const handleAdd = () => {
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newCar),
        })
            .then((response) => {
                if (!response.ok) throw new Error("Failed to add car");
                return response.json();
            })
            .then((data) => {
                setCars((prevCars) => [...prevCars, data]);
                setNewCar({
                    make: "",
                    model: "",
                    year: "",
                    capacity: "",
                    status: "available",
                    license_plate: "",
                }); // Reset the form
            })
            .catch((error) => console.error(error));
    };

    return (
        <div>
            <h2>Car Editor</h2>
            <div>
                {cars.map((car) => (
                    <div
                        key={car.car_id}
                        style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}
                    >
                        <h3>Car #{car.car_id}</h3>
                        <label>
                            Make:
                            <input
                                type="text"
                                value={car.make}
                                onChange={(e) => handleEditChange(car.car_id, "make", e.target.value)}
                            />
                        </label>
                        <label>
                            Model:
                            <input
                                type="text"
                                value={car.model}
                                onChange={(e) => handleEditChange(car.car_id, "model", e.target.value)}
                            />
                        </label>
                        <label>
                            Year:
                            <input
                                type="text"
                                value={car.year}
                                onChange={(e) => handleEditChange(car.car_id, "year", e.target.value)}
                            />
                        </label>
                        <label>
                            Capacity:
                            <input
                                type="number"
                                value={car.capacity}
                                onChange={(e) => handleEditChange(car.car_id, "capacity", e.target.value)}
                            />
                        </label>
                        <label>
                            License Plate:
                            <input
                                type="text"
                                value={car.license_plate}
                                onChange={(e) => handleEditChange(car.car_id, "license_plate", e.target.value)}
                            />
                        </label>
                        <label>
                            Status:
                            <select
                                value={car.status}
                                onChange={(e) => handleEditChange(car.car_id, "status", e.target.value)}
                            >
                                <option value="available">Available</option>
                                <option value="rented">Rented</option>
                                <option value="under_maintenance">Under Maintenance</option>
                            </select>
                        </label>
                        <button onClick={() => handleSave(car.car_id)}>Save</button>
                        <button onClick={() => handleDelete(car.car_id)}>Delete</button>
                    </div>
                ))}
            </div>

            <h3>Add a New Car</h3>
            <div style={{ border: "1px solid #ccc", padding: "10px" }}>
                <label>
                    Make:
                    <input
                        type="text"
                        value={newCar.make}
                        onChange={(e) => setNewCar({ ...newCar, make: e.target.value })}
                    />
                </label>
                <label>
                    Model:
                    <input
                        type="text"
                        value={newCar.model}
                        onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
                    />
                </label>
                <label>
                    Year:
                    <input
                        type="text"
                        value={newCar.year}
                        onChange={(e) => setNewCar({ ...newCar, year: e.target.value })}
                    />
                </label>
                <label>
                    Capacity:
                    <input
                        type="number"
                        value={newCar.capacity}
                        onChange={(e) => setNewCar({ ...newCar, capacity: e.target.value })}
                    />
                </label>
                <label>
                    License Plate:
                    <input
                        type="text"
                        value={newCar.license_plate}
                        onChange={(e) => setNewCar({ ...newCar, license_plate: e.target.value })}
                    />
                </label>
                <label>
                    Status:
                    <select
                        value={newCar.status}
                        onChange={(e) => setNewCar({ ...newCar, status: e.target.value })}
                    >
                        <option value="available">Available</option>
                        <option value="rented">Rented</option>
                        <option value="under_maintenance">Under Maintenance</option>
                    </select>
                </label>
                <button onClick={handleAdd}>Add Car</button>
            </div>
        </div>
    );
};

export default CarsEditor;