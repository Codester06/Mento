import axios from 'axios';

// Replace with your actual API Gateway URL
const API_BASE_URL = '';

// Function to send a GET request (fetch all items or a specific one by ID)
const getData = async (endpoint, id = '') => {
    try {
        const url = id ? `${API_BASE_URL}${endpoint}/${id}` : `${API_BASE_URL}${endpoint}`;
        const response = await axios.get(url);
        console.log('GET Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error in GET request:', error.response ? error.response.data : error.message);
    }
};

// Function to send a POST request (create a new item)
const postData = async (endpoint, data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}${endpoint}`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', // This is not necessary in request
                'Access-Control-Allow-Credentials': true // Recommend configurate on server-side
            }
        });
        console.log('POST Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error in POST request:', error.response ? error.response.data : error.message);
    }
};

// Function to send a PUT request (update an existing item)
const updateData = async (endpoint, id, data) => {
    try {
        const response = await axios.put(`${API_BASE_URL}${endpoint}/${id}`, data, {
            headers: { 'Content-Type': 'application/json' }
        });
        console.log('PUT Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error in PUT request:', error.response ? error.response.data : error.message);
    }
};

// Function to send a DELETE request (delete an item by ID)
const deleteData = async (endpoint, id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}${endpoint}/${id}`);
        console.log('DELETE Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error in DELETE request:', error.response ? error.response.data : error.message);
    }
};


export { getData, postData, updateData, deleteData };