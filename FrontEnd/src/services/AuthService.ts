// services/authService.ts
import axios from 'axios'

export const register = async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}) => {
    try {
        const response = await axios.post('/api/auth/register', userData)

        // Limpia cualquier token existente en localStorage antes de guardar el nuevo
        localStorage.removeItem('token')
        localStorage.setItem('token', response.data.token)
       // console.log("Nuevo token almacenado en register:", response.data.token) // Verificar que se guarda el nuevo token

        return response.data
    } catch (error) {
        throw error
    }
}


export const authenticate = async (credentials: {
    email: string;
    password: string;
}) => {
    try {
        const response = await axios.post('/api/auth/login', credentials)

        // Limpia cualquier token existente en localStorage antes de guardar el nuevo
        localStorage.removeItem('token')
        localStorage.setItem('token', response.data.token)
       // console.log("Nuevo token almacenado:", response.data.token) // Verificar que se guarda el nuevo token

        return response.data
    } catch (error) {
        throw error
    }
}
