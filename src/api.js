import axios from 'axios';

const API_URL = 'http://localhost:8000';

const register = (username, email, password) => {
    return axios.post(`${API_URL}/register/`, { username, email, password });
};

const login = (username, password) => {
    return axios.post(`${API_URL}/login/`, { username, password });
};

export { register, login };