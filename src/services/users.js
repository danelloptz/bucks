import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getAuthUserInfo(token) {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/v1/auth/me`, 
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении информации о пользователе при авторизации.", error);
        return false; 
    }
}

export async function getUserInfo(token) {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/v1/users/me`, 
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении информации о пользователе.", error);
        return false; 
    }
}

export async function getReferralInfo(code) {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/v1/users/referral-info`, {
            code: code,
        });
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении информации о реферере по крду.", error);
        return false; 
    }
}

export async function getUserInfoById(user_id) {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/v1/users/${user_id}`, );
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении информации о пользователе по айди.", error);
        return false; 
    }
}