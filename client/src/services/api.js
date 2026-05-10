import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const authService = {
  register: (name, email, password) =>
    api.post('/auth/register', { name, email, password }),
  login: (email, password) => api.post('/auth/login', { email, password }),
};

// Resume endpoints
export const resumeService = {
  uploadResume: (file, jobDescription) => {
    const formData = new FormData();
    formData.append('file', file);
    if (jobDescription) {
      formData.append('jobDescription', jobDescription);
    }
    return api.post('/resume/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  getResume: (id) => api.get(`/resume/${id}`),
  getAllResumes: () => api.get('/resume'),
  deleteResume: (id) => api.delete(`/resume/${id}`),
};

// ATS endpoints
export const atsService = {
  calculateScore: (resumeText, jobDescription) =>
    api.post('/ats/calculate', { resumeText, jobDescription }),
  extractKeywords: (text) => api.post('/ats/keywords', { text }),
};

export default api;
