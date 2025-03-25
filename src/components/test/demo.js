import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Configuration
const API_BASE_URL = process.env.REACT_APP_AWS_API_BASE || 'https://api.example.com';
const API_KEY = process.env.REACT_APP_AWS_BASE_API_KEY;

const DataFetcher = () => {
    // State to store fetched data
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const deleteData = async (endpoint, id) => {
        try {
            const url = `${API_BASE_URL}${endpoint}`;
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
    // Function to fetch data
    const fetchData = async (endpoint, id = '') => {
        try {
            // Construct URL with optional ID
            const url = id 
                ? `${API_BASE_URL}${endpoint}/${id}`
                : `${API_BASE_URL}${endpoint}`;

            // Perform GET request
            const response = await axios.get(url, {
                headers: {
                    'x-api-key': API_KEY,
                    'Content-Type': 'application/json'
                }
            });

            // Update state with fetched data
            setData(response.data);
            setLoading(false);
        } catch (err) {
            // Handle errors
            setError(err.response ? err.response.data : err.message);
            setLoading(false);
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        // fetchData('/individual');
        deleteData('/individual',"5c45a27b-b17d-4404-a7a5-7328d31af962").then(()=>console.log('sucess')).catch(error=>(error));

    }, []);

    // Render loading state
    if (loading) return <div>Loading...</div>;

    // Render error state
    if (error) return console.log(error) , <div>Error: {error}</div>;


    return (
        <div>
            <h1>Fetched Data</h1>
            {/* Render fetched data */}
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default DataFetcher;

