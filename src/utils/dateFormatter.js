// src/utils/dateFormatter.js

export function formatDate(dateString) {
  if (!dateString) return '';
  
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  // Esto convierte "2023-10-25T10:00:00Z" en "25 de octubre de 2023"
  return new Date(dateString).toLocaleDateString('es-ES', options);
}
