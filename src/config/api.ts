export const API_DOMAIN = import.meta.env.VITE_API_DOMAIN

export const API_ENDPOINTS = {
  records: `${API_DOMAIN}/records`,
  createRecord: `${API_DOMAIN}/records`
} as const