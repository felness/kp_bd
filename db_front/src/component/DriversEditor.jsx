import { useEffect, useState } from "react";

const DriversEditor = () => {
    const [drivers, setDrivers] = useState([]);
    const [newDriver, setNewDriver] = useState({
        full_name: "",
        top_rate: "",
    });
    const url = 'http://localhost:8080/api/drivers';

    // Load driver list when component mounts
    useEffect(() => {
        fetch(url)
            .then((response) => {
                if (!response.ok) throw new Error("Failed to load drivers");
                return response.json();
            })
            .then((data) => setDrivers(data))
            .catch((error) => console.error(error));
    }, []);

    // Update a field value for editing
    const handleEditChange = (driver_id, field, value) => {
        setDrivers((prevDrivers) =>
            prevDrivers.map((driver) =>
                driver.driver_id === driver_id ? { ...driver, [field]: value } : driver
            )
        );
    };

    // Save driver changes
    const handleSave = (driver_id) => {
        const updatedDriver = drivers.find((driver) => driver.driver_id === driver_id);
        fetch(`${url}/${driver_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedDriver),
        })
            .then((response) => {
                if (!response.ok) throw new Error("Failed to update driver");
                alert("Driver updated successfully!");
            })
            .catch((error) => console.error(error));
    };

    // Delete a driver
    const handleDelete = (driver_id) => {
        fetch(`${url}/${driver_id}`, { method: "DELETE" })
            .then((response) => {
                if (!response.ok) throw new Error("Failed to delete driver");
                setDrivers((prevDrivers) => prevDrivers.filter((driver) => driver.driver_id !== driver_id));
            })
            .catch((error) => console.error(error));
    };

    // Add a new driver
    const handleAdd = () => {
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newDriver),
        })
            .then((response) => {
                if (!response.ok) throw new Error("Failed to add driver");
                return response.json();
            })
            .then((data) => {
                setDrivers((prevDrivers) => [...prevDrivers, data]);
                setNewDriver({
                    full_name: "",
                    top_rate: "",
                }); // Reset the form
            })
            .catch((error) => console.error(error));
    };

    return (
        <div>
            <h2>Driver Editor</h2>
            <div>
                {drivers.map((driver) => (
                    <div
                        key={driver.driver_id}
                        style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}
                    >
                        <h3>Driver #{driver.driver_id}</h3>
                        <label>
                            Full Name:
                            <input
                                type="text"
                                value={driver.full_name}
                                onChange={(e) => handleEditChange(driver.driver_id, "full_name", e.target.value)}
                            />
                        </label>
                        <label>
                            Top Rate:
                            <input
                                type="text"
                                value={driver.top_rate}
                                onChange={(e) => handleEditChange(driver.driver_id, "top_rate", e.target.value)}
                            />
                        </label>
                        <button onClick={() => handleSave(driver.driver_id)}>Save</button>
                        <button onClick={() => handleDelete(driver.driver_id)}>Delete</button>
                    </div>
                ))}
            </div>

            <h3>Add a New Driver</h3>
            <div style={{ border: "1px solid #ccc", padding: "10px" }}>
                <label>
                    Full Name:
                    <input
                        type="text"
                        value={newDriver.full_name}
                        onChange={(e) => setNewDriver({ ...newDriver, full_name: e.target.value })}
                    />
                </label>
                <label>
                    Top Rate:
                    <input
                        type="text"
                        value={newDriver.top_rate}
                        onChange={(e) => setNewDriver({ ...newDriver, top_rate: e.target.value })}
                    />
                </label>
                <button onClick={handleAdd}>Add Driver</button>
            </div>
        </div>
    );
};

export default DriversEditor;
