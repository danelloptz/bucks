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

export async function getLinear(user_id, limit, offset, token) {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/v1/users/line_structure`, 
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                params: {
                    user_id: user_id,
                    limit: limit,
                    offset: offset
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении рефералов первого уровня.", error);
        return false; 
    }
}

export async function findUser(referral_code, token) {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/v1/users/search_in_structure`, 
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                params: {
                    referral_code: referral_code
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Ошибка при поиске реферала в линейной структуре.", error);
        return false; 
    }
}

export async function getMatrix(root_id, depth, token) {
    try {
        let data;
        if (!root_id) {
            data = {
                depth: depth
            }
        } else {
            data = {
                root_id: root_id,
                depth: depth
            }
        }
        const response = await axios.get(`${API_BASE_URL}/api/v1/business-places/matrix`, 
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                params: data
            }
        );
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении матрицы пользователей.", error);
        return false; 
    }
}