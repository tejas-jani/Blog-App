

// this function return response and data as object
const fetchFromApi = async (endPoint, option = {}) => {
    
    const BASE_URL = "http://localhost:4000/api"
    console.log(BASE_URL + endPoint);
    
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