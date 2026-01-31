

const BASE_URL =  `https://api.nasa.gov/planetary/apod?api_key=${import.meta.env.VITE_API_KEY}`;

export const getImagesFromRange = (from, to) => {
    return fetch(`${BASE_URL}&start_date=${from}&end_date=${to}`)
}