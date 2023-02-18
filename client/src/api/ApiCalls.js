import axios from "axios";

export const getLocations = async () => {
    return await axios.get("http://localhost:5000/get_locations")
}

export const getEstimatedPrice = async (data) => {
    return await axios.post(
        'http://127.0.0.1:5000/get_price',
        // '{ "total_sqft": "1000", "bhk": "2", "bath": "2", "location": "Indira Nagar" }',
        {
            'sqft': data.sqft,
            'bhk': data.bhk,
            'bath': data.bath,
            'location': data.location
        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
}