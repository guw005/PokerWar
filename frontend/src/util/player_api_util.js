import axios from "axios";

export const getPlayers = () => {
    return axios.get('/api/players');
};

export const updatePlayer = (id, userInfo) => {
    return axios.post(`/api/players/update/${id}`, userInfo);
};