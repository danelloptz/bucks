import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getStructure(token) {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/v1/users/structure_info`, 
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении информации о структуре пользователя.", error);
        return false; 
    }
}