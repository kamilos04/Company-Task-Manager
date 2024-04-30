import axios from "axios"

// export const API_URL = "http://localhost:8080"
export const API_URL = "http://157.158.184.79:8080"

export const api=axios.create({
    baseURL:API_URL,
    headers:{
        "Content-Type": "application/json",
    }
})