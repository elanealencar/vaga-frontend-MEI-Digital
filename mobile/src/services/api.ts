import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://192.168.100.87:3001',  // no celular, usar o IP da máquina
});
