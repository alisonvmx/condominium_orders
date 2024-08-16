// src/services/apiService.js
import axios from 'axios';

// Crie uma instância do Axios com uma configuração padrão
const apiClient = axios.create({
  baseURL: 'http://0.0.0.0:8084/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Função para fazer uma requisição GET
export function getUsers() {
  return apiClient.get('/users');
}

// Função para requisitar um usuário pelo ID
export function getUserById(id) {
  return apiClient.get(`/users/${id}`);
}

// Função para deletar um usuário pelo ID
export function deleteUserById(id) {
  return apiClient.delete(`/users/${id}`);
}

// Função para atualizar um usuário pelo ID
export function updateUser(id, userData) {
  return apiClient.put(`/users/${id}`, userData);
}

// Função para atualizar um usuário pelo ID
export function createUser(userData) {
  return apiClient.post('/users', userData);
}
