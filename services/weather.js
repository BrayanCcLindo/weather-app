import {API_KEY, BASE_API} from '../js/constants.js'

export async function getCurrentWeather(lat, lon){
    const response = await fetch(`${BASE_API}weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    if(!response.ok) return {
        irError: true,
        data: null
    } 
    const data = await response.json()
    return {
        isError:false,
        data,
    }
}
