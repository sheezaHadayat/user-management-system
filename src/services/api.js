import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const fetchUsers = () => {
  return axios.get(`${API_URL}/users`);
};

export const deleteUser = (userId) => {
  return axios.delete(`${API_URL}/users/${userId}`);
};
