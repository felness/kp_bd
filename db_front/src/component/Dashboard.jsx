import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import CarEditor from "./CarsEditor.jsx";
import StationEditor from "./StationEditor.jsx";
import DriverEditor from "./DriversEditor.jsx";
import UserList from "./UserList.jsx";
import BookingStats from "./BookingStats.jsx";
import BookFlightButton from "./BookingForm.jsx"; // Import the BookingForm
import BackupButton from "./Backup.jsx"; // Импортируем компонент кнопки бэкапа

const Dashboard = () => {
    const [role, setRole] = useState(null);
    const [userId, setUserId] = useState(null);
    const [showCarEditor, setShowCarEditor] = useState(false);
    const [showStationEditor, setShowStationEditor] = useState(false);
    const [showDriverEditor, setShowDriverEditor] = useState(false);
    const [showUserList, setShowUserList] = useState(false);
    const [showBookingStats, setShowBookingStats] = useState(false);
    const [showBookingForm, setShowBookingForm] = useState(false);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    // Проверяем наличие роли и userId в localStorage при загрузке
    useEffect(() => {
        const storedRole = localStorage.getItem("role");
        console.log(storedRole);
        const storedUserId = localStorage.getItem("userId");
        console.log(storedUserId);

        if (!storedRole || !storedUserId) {
            console.log("storedRole и storedUserId не проходит проверку идет навигация обратно на авторизацию");
            navigate("/auth"); // Если данных нет, перенаправляем на авторизацию
        } else {
            console.log("они прошли проверку и засетились");
            setRole(storedRole);
            setUserId(storedUserId);
        }
        setIsLoading(false);
    }, [navigate]);

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    if (!role) {
        console.log("роль не прошла");
        return <Navigate to="/auth" />;
    }

    return (
        <div>
            <h1>Добро пожаловать на сервис Аренды автомобилей!</h1>
            <img src="https://acontrols.rentride.ru/storage/arenda/Vnedorozhnik/Vnedorozhnik-3.jpg" alt="Car Image"
                 style={{width: '100%', maxWidth: '600px', height: 'auto', marginBottom: '20px'}}/>
            <p>Ваша роль: {role}</p>
            <nav>
                {role === "ADMIN" && (
                    <button onClick={() => setShowUserList(!showUserList)}>
                        {showUserList ? "Закрыть список пользователей" : "Просмотр пользователей"}
                    </button>
                )}
                {role === "ADMIN" && (
                    <button onClick={() => setShowBookingStats(!showBookingStats)}>
                        {showBookingStats ? "Закрыть статистику" : "Статистика аренды"}
                    </button>
                )}
                {role === "ADMIN" && (
                    <BackupButton/>
                )}
                {role === "REDACTOR" && (
                    <button onClick={() => setShowCarEditor(!showCarEditor)}>
                        {showCarEditor ? "Закрыть редактор машин" : "Редактирование машин"}
                    </button>
                )}
                {role === "REDACTOR" && (
                    <button onClick={() => setShowStationEditor(!showStationEditor)}>
                        {showStationEditor ? "Закрыть редактор станций" : "Редактирование станций"}
                    </button>
                )}
                {role === "REDACTOR" && (
                    <button onClick={() => setShowDriverEditor(!showDriverEditor)}>
                        {showDriverEditor ? "Закрыть редактор водителей" : "Редактирование водителей"}
                    </button>
                )}
                {role === "USER" && (
                    <button onClick={() => setShowBookingForm(!showBookingForm)}>
                        {showBookingForm ? "Закрыть форму аренды" : "Арендовать автомобиль"}
                    </button>
                )}
            </nav>

            {showCarEditor && <CarEditor/>}
            {showStationEditor && <StationEditor/>}
            {showDriverEditor && <DriverEditor/>}
            {showUserList && <UserList/>}
            {showBookingStats && <BookingStats/>}
            {showBookingForm && <BookFlightButton userId={userId}/>}
        </div>

    );
};

export default Dashboard;
