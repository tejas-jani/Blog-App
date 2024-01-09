

// this function return response and data as object
export const BASE_URL =  import.meta.env.VITE_SERVER_BASE_URL
export const BASE_URL_FOR_IMG =  import.meta.env.VITE_SERVER_BASE_URL_FOR_IMG


const fetchFromApi = async (endPoint, option = {}) => {
    
    
    try {
        const response = await fetch(BASE_URL + endPoint, option);
        const data = await response.json();
         
        if (!response.ok)
            throw new Error(data.err || data.message || 'Request failed');
            return {response, data};
    }catch(err){
        console.log(err);
        throw err;
    }
}
export default fetchFromApi;