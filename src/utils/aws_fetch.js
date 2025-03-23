import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://yhk7zholf8.execute-api.ap-south-1.amazonaws.com/dev";

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(API_URL)

      .then((response) => {
        console.log("API Response:", response.data); // Debugging
        setData(response.data);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        if (error.message.includes("Network Error")) {
          setError(
            "Network error: This might be due to CORS policy restrictions. Check your API configuration."
          );
        } else if (error.response && error.response.status === 404) {
          setError("API endpoint not found. Please verify the URL is correct.");
        } else {
          setError(`Error: ${error.message}`);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Data from DynamoDB</h1>
      {loading && <p>Loading data...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default App;
