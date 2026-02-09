import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function signUp(email, password, referrer) {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/v1/auth/register`, {
            email: email,
            password: password,
            referrer: referrer
        });
        return response.data;
    } catch (error) {
        console.error("Ошибка при регистрации пользователя.", error);
        return false; 
    }
}

export async function logIn(email, password) {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/v1/auth/login`, {
            email: email,
            password: password,
        });
        return response.data;
    } catch (error) {
        console.error("Ошибка при авторизации пользователя.", error);
        return false; 
    }
}