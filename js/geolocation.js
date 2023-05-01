

function geolocationSupport(){
    return 'geolocation' in navigator
}

const defaultOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 10000,
}


export function getCurrentPosition(Options = defaultOptions){

    if(!geolocationSupport()) throw new Error('Tu navegador no tiene soporte para geolocalizarte')

    return new Promise((resolve, reject)=>{
        navigator.geolocation.getCurrentPosition((position)=>{
            const lat = position.coords.latitude
            const lon = position.coords.longitude
            resolve(position)
            
    }, () =>{
       reject('No te logramos ubicar')  
    }, Options)

    })
}

export async function getLatLon(Options = defaultOptions){

    try{
        const {coords: {latitude: lat, longitude: lon}} = await getCurrentPosition(Options)
        return{lat, lon, isError: false}
    }
    catch{ 
        return {
            isError: true, lat: null, lon: null
        }
    }
}