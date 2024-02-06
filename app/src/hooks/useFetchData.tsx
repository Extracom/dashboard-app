import { useEffect, useState } from "react";
import Api from '../api/Api';
import { getToken } from '../utils/utils';

// This hook fetches data from a given URL and body
const useFetchData = (url: string, body?: { [key: string]: any; }) => {
    // State variables for data, error, and loading status
    const [data, setData] = useState<{ [key: string]: any; } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Function to refresh data
    const refreshData = async (url: string, body?: { [key: string]: any; }) => {
        // Start loading
        setLoading(true);

        // Get token
        const token = getToken();
        // If no token, set error and stop loading
        if (!token) {
            const errorMessage = "User session expired. Please sign in again.";
            setError(errorMessage);
            setLoading(false);
            return;
        }

        // Request configuration
        const requestConfig = {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        };

        // Fetch data from API
        try {
            const apiResponse = await Api.post(url, body, requestConfig);
            // If no data in response, throw error
            if (!apiResponse.data) {
                throw new Error('No data in API response');
            }
            // Set data
            setData(apiResponse.data);
        } catch (error: any) {
            // If error, set error message and stop loading
            const errorMessage = error.response?.data?.message || error.message;
            setError(errorMessage);
            setLoading(false);
        } finally {
            // Stop loading
            setLoading(false);
        }
    }

    // Effect hook to refresh data when url or body changes
    useEffect(() => {
        if (url.length > 0) {
            refreshData(url, body);
        }
    }, [url]);

    // Return data, error, loading status, and refresh function
    return { data, error, loading, refreshData };
};

export default useFetchData;
