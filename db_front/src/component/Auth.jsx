// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn, getUserByUsername } from "../api";

// eslint-disable-next-line react/prop-types
const Auth = ({ onAuth, setRole, setUserId }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { accessToken, refreshToken } = await signIn(username, password); // Авторизация
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);

            const user = await getUserByUsername(username, accessToken);
            console.log(user); // Временная отладка
            // Извлекаем необходимые данные из ответа
            const userId = user.user_id; // Или user["userId"], если ключи динамические
            const role = user.role;    // Или user["role"], если ключи динамические

            // Сохраняем данные в локальное хранилище
            localStorage.setItem("userId", userId);
            localStorage.setItem("role", role);
            console.log(localStorage.getItem("userId"));
            console.log(localStorage.getItem("role"));

            // Устанавливаем состояние приложения
            setRole(role);
            setUserId(userId);
            onAuth(true);
            console.log("в Auth ид пользователя " + userId + " роль " + role);

            navigate("/dashboard");
        } catch (error) {
            setMessage(error.message || "Произошла ошибка авторизации");
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ marginBottom: '20px' }}>Авторизация</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label>Имя пользователя:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label>Пароль:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                    Войти
                </button>
            </form>
            {message && <p style={{ marginTop: '15px', color: message.includes('ошибка') ? 'red' : 'green' }}>{message}</p>}
        </div>
    );
};

export default Auth;
