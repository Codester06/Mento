import axios from 'axios';

// Replace with your actual API Gateway URL
const API_BASE_URL = process.env.REACT_APP_AWS_API_BASE;
const API_KEY =process.env.REACT_APP_AWS_BASE_API_KEY;
const API_BASE_URL_BS = process.env.REACT_APP_AWS_API_BASE_BS


// Function to send a GET request (fetch all items or a specific one by ID)
const getData = async (endpoint, id = '') => {
    // Create state-like variables to manage loading and error states
    let data = null;
    let loading = true;
    let error = null;

    try {
        const url = id 
            ? `${API_BASE_URL}${endpoint}/${id}` 
            : `${API_BASE_URL}${endpoint}`;
        
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY
            }
        });
        // Log the response data
        // console.log('GET Response:', response.data);
        
        // Set data and update loading state
        data = response.data;
        loading = false;

        return { data, loading, error };
    } catch (err) {
        // Handle errors
        error = err.response ? err.response.data : err.message;
        loading = false;

        // Log the error
        // console.error('Error in GET request:', error);

        return { data, loading, error };
    }
};


// Function to send a POST request (create a new item)
const postData = async (endpoint, data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}${endpoint}`, data, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY
            }
        });
        // console.log('POST Response:', response.data);
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
        // console.log('PUT Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error in PUT request:', error.response ? error.response.data : error.message);
    }
};

// Function to send a DELETE request (delete an item by ID)
const deleteData = async (endpoint, id) => {
    try {
        const url =` ${API_BASE_URL}${endpoint};`
        const response = await axios.delete(url, {
             params:{
                id
             },
            headers: {
                'x-api-key': API_KEY,
                'Content-Type': 'application/json'
            }
        });
        console.log('DELETE Response:', response.data);
        return response.data;
    } catch (error) {
        console.error(
            'Error in DELETE request:', 
            error.response ? error.response.data : error.message
        );
        throw error;
    }
};


// blog self assignment key 
const getDataBS = async (endpoint, id = '') => {
    // Create state-like variables to manage loading and error states
    let data = null;
    let loading = true;
    let error = null;

    try {
        const url = id 
            ? `${API_BASE_URL_BS}${endpoint}/${id}` 
            : `${API_BASE_URL_BS}${endpoint}`;
        
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY
            }
        });
        // Log the response data
        // console.log('GET Response:', response.data);
        
        // Set data and update loading state
        data = response.data;
        loading = false;

        return { data, loading, error };
    } catch (err) {
        // Handle errors
        error = err.response ? err.response.data : err.message;
        loading = false;

        // Log the error
        // console.error('Error in GET request:', error);

        return { data, loading, error };
    }
};

const postDataBS = async (endpoint, data) => {
    try {
        const response = await axios.post(`${API_BASE_URL_BS}${endpoint}`, data, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY
            }
        });
        // console.log('POST Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error in POST request:', error.response ? error.response.data : error.message);
    }
};

// Function to send a PUT request (update an existing item)
const updateDataBS = async (endpoint, id, data) => {
    try {
        const response = await axios.put(`${API_BASE_URL_BS}${endpoint}/${id}`, data, {
            headers: { 'Content-Type': 'application/json' }
        });
        // console.log('PUT Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error in PUT request:', error.response ? error.response.data : error.message);
    }
};

// Function to send a DELETE request (delete an item by ID)
const deleteDataBS = async (endpoint, id) => {
    try {
        const url =` ${API_BASE_URL_BS}${endpoint};`
        const response = await axios.delete(url, {
             params:{
                id
             },
            headers: {
                'x-api-key': API_KEY,
                'Content-Type': 'application/json'
            }
        });
        console.log('DELETE Response:', response.data);
        return response.data;
    } catch (error) {
        console.error(
            'Error in DELETE request:', 
            error.response ? error.response.data : error.message
        );
        throw error;
    }
};

export { getData, postData, updateData, deleteData ,getDataBS,postDataBS, deleteDataBS, updateDataBS};