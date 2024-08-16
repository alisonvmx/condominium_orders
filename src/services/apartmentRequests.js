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
export function getApartments() {
  return apiClient.get('/apartments');
}

// Função para requisitar um usuário pelo ID
export function getApartmentById(id) {
  return apiClient.get(`/apartments/${id}`);
}

// Função para deletar um usuário pelo ID
export function deleteApartmentById(id) {
  return apiClient.delete(`/apartments/${id}`);
}

// Função para atualizar um usuário pelo ID
export function updateApartment(id, apartmentData) {
  return apiClient.put(`/apartments/${id}`, apartmentData);
}

// Função para atualizar um usuário pelo ID
export function createApartment(apartmentData) {
  return apiClient.post('/apartments', apartmentData);
}
