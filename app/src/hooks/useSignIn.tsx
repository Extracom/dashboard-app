// Import necessary modules and functions
import { useState } from "react";
import Api from '../api/Api';
import { Credentials } from '../interfaces/interfaces';
import { saveToken } from '../utils/utils';

// Define the custom hook
const useSignIn = () => {
    // Define state variables for error and loading status
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Define the signInUser function
    const signInUser = async (credentials: Credentials) => {
        // Start loading and clear any previous errors
        setLoading(true);
        setError(null);
        try {
            // Make a POST request to the API with the provided credentials
            const apiResponse = await Api.post('/account/token', credentials);

            // If the response status is not 200, set the error and stop loading
            if (apiResponse.status !== 200) {
                const errorText = 'Email or password is incorrect';
                setError(errorText);
                setLoading(false);
                return apiResponse.status;
            }

            // If the response status is 200, save the token and stop loading
            saveToken(apiResponse.data);
            setLoading(false);
            return apiResponse.status;

        } catch (error: any) {
            // If an error occurs, set the error message and stop loading
            const errorMessage = error.response?.data?.message || error.message;
            setError(errorMessage);
            setLoading(false);
            return false;
        }
    };

    // Return the error, loading status, and signInUser function
    return { error, loading, signInUser };
};

// Export the custom hook
export default useSignIn;
