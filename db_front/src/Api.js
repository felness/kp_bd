const API_URL = "http://localhost:8080/api";

// Регистрация пользователя
export async function signUp(username, email, password, role) {
    const response = await fetch(`${API_URL}/auth/sign-up`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, role }),
    });

    if (!response.ok) {
        throw new Error("Ошибка регистрации: данное имя пользователя занято");
    }

    return response.json(); // Возвращает объект с токеном
}

// Авторизация пользователя
export async function signIn(username, password) {
    const authResponse = await fetch(`${API_URL}/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    if (!authResponse.ok) {
        throw new Error("Ошибка авторизации: неверное имя пользователя или пароль");
    }

    const { accessToken, refreshToken } = await authResponse.json();
    return { accessToken, refreshToken };
}

export async function getUserByUsername(username, accessToken) {
    const userResponse = await fetch(`${API_URL}/users/username/${username}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
    });

    if (!userResponse.ok) {
        throw new Error("Не удалось получить данные пользователя");
    }

    return await userResponse.json();
}

// Получение списка пользователей
export async function getUsers() {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(`${API_URL}/users`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Не удалось получить список пользователей");
    }

    return response.json();
}

// Получение списка бронирований по пользователям
export async function getCustomerBookings() {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(`${API_URL}/cust-bookings`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Не удалось получить данные о бронированиях");
    }

    return response.json();
}

// Получение машины
export async function getCars() {
    const response = await fetch(`${API_URL}/bookings/cars`);
    if (!response.ok) {
        throw new Error("Не удалось получить список машин");
    }
    return response.json();
}

// Получение станций
export async function getStations() {
    const response = await fetch(`${API_URL}/bookings/stations`);
    if (!response.ok) {
        throw new Error("Не удалось получить список станций");
    }
    return response.json();
}

// Получение водителей
export async function getDrivers() {
    const response = await fetch(`${API_URL}/bookings/drivers`);
    if (!response.ok) {
        throw new Error("Не удалось получить список водителей");
    }
    return response.json();
}

// Создание бронирования
export const createBooking = async (bookingData) => {
    const response = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
        // Попробуем разобрать JSON с ошибкой, если он есть
        const errorData = await response.json().catch(() => null);
        if (errorData && errorData.error) {
            throw new Error(errorData.error); // Пробрасываем сообщение из ответа
        }
        throw new Error("Ошибка сети или сервера. Проверьте соединение."); // Общая ошибка
    }

    return response.json(); // Возвращаем успешный ответ
};

export async function getCustomer(userId) {
    console.log(userId);
    const response = await fetch(`${API_URL}/customers/${userId}`);
    if (!response.ok) {
        throw new Error("Не удалось получить данные о клиенте");
    }
    return response.json();
}