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
export function getOrders() {
  return apiClient.get('/orders');
}

// Função para requisitar um usuário pelo ID
export function getOrderById(id) {
  return apiClient.get(`/orders/${id}`);
}

// Função para deletar um usuário pelo ID
export function deleteOrderById(id) {
  return apiClient.delete(`/orders/${id}`);
}

// Função para atualizar um usuário pelo ID
export function updateOrder(id, orderData) {
  return apiClient.put(`/orders/${id}`, orderData);
}

// Função para atualizar um usuário pelo ID
export function createOrder(orderData) {
  return apiClient.post('/orders', orderData);
}
