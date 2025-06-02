import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

const WebSocketNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [stompClient, setStompClient] = useState(null);

    // Function to get notification style based on type
    const getNotificationStyle = (type) => {
        const baseStyle = {
            padding: '15px 25px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            animation: 'slideIn 0.3s ease-out',
            maxWidth: '80%',
            textAlign: 'center',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000
        };

        // Определяем стиль на основе содержимого type
        if (type.includes('Бронирование')) {
            return {
                ...baseStyle,
                backgroundColor: 'rgba(46, 125, 50, 0.9)',
                borderLeft: '4px solid #2e7d32'
            };
        } else if (type.includes('Бэкап')) {
            return {
                ...baseStyle,
                backgroundColor: 'rgba(2, 136, 209, 0.9)',
                borderLeft: '4px solid #0288d1'
            };
        } else {
            return {
                ...baseStyle,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                borderLeft: '4px solid #666'
            };
        }
    };

    // Function to get icon based on type
    const getNotificationIcon = (type) => {
        if (type.includes('Бронирование')) {
            return '✓';
        } else if (type.includes('Бэкап')) {
            return '💾';
        } else {
            return '•';
        }
    };

    useEffect(() => {
        try {
            const socket = new SockJS('http://localhost:8080/ws', null, {
                transports: ['websocket', 'xhr-streaming', 'xhr-polling'],
                timeout: 5000
            });
            
            const client = new Client({
                webSocketFactory: () => socket,
                debug: () => {}, // Отключаем отладочные сообщения
                reconnectDelay: 5000,
                heartbeatIncoming: 4000,
                heartbeatOutgoing: 4000
            });

            client.onConnect = () => {
                client.subscribe('/topic/notifications', (message) => {
                    try {
                        const notification = JSON.parse(message.body);
                        setNotifications(prev => [...prev, notification]);
                        
                        // Remove notification after 5 seconds
                        setTimeout(() => {
                            setNotifications(prev => prev.filter(n => n !== notification));
                        }, 5000);
                    } catch (error) {
                        console.error('Error parsing notification:', error);
                    }
                });
            };

            client.activate();
            setStompClient(client);

            return () => {
                if (client) {
                    client.deactivate();
                }
            };
        } catch (error) {
            console.error('Error initializing WebSocket:', error);
        }
    }, []);

    return (
        <div>
            {notifications.map((notification, index) => (
                <div
                    key={index}
                    style={getNotificationStyle(notification.type)}
                >
                    <div style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: '1.1em',
                        fontWeight: 'bold'
                    }}>
                        <span>{getNotificationIcon(notification.type)}</span>
                        <span>{notification.type}</span>
                    </div>
                    <div style={{
                        fontSize: '0.9em',
                        opacity: 0.9
                    }}>
                        {notification.message}
                    </div>
                </div>
            ))}
            <style>
                {`
                    @keyframes slideIn {
                        from {
                            transform: translate(-50%, -100%);
                            opacity: 0;
                        }
                        to {
                            transform: translate(-50%, -50%);
                            opacity: 1;
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default WebSocketNotifications; 