export const BASE_URI = import.meta.env.VITE_API_BASE_URL
  ? import.meta.env.VITE_API_BASE_URL
  : "http://localhost:4000";
export const API_BASE_URI = import.meta.env.VITE_API_BASE_URL
  ? import.meta.env.VITE_API_BASE_URL + "/api"
  : "http://localhost:4000/api";
export const BUILD = import.meta.env.VITE_API_BASE_URL
  ? "production"
  : "development";

// export const APP_URL = "https://test.condigital.cloud";
// export const BASE_URI = "https://test.condigital.cloud:3000";
// export const API_BASE_URI = "https://test.condigital.cloud:3000/api";
// export const BUILD = "production";
