import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000/api/'

export const register = (username, email, password)=>{
    return axios.post(`${API_URL}register/`, {
        username,
        email, 
        password
        })
}

export const login = (username, password)=>{
    return axios.post(`${API_URL}login/`, {
        username,
        password

    })
}

export const refreshToken = (refreshToken)=>{
    return axios.post(`${API_URL}token/refresh/`, {
        refresh: refreshToken
    })
}