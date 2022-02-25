import axios from 'axios'

const url = "https://music-players-backend.herokuapp.com"
// const url = "http://localhost:9000"

export const AxiosInstance = axios.create({
    baseURL: url
})



// for getting images from backend

export const gettingImages = (image) => {
    return `${url}/images/${image}`
}


// for song
export const gettingSong = (type, name) => {
    return `${url}/${type}/${name}`
}