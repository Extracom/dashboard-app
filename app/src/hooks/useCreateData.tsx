import { useState } from "react";
import Api from '../api/Api';


const useCreateData = (url: string) => {
    const [data, setData] = useState<{ [key: string]: any; } | null>(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const createData = async (createdData: { [key: string]: any; }) => {
        setLoading(true);
        setError(null);
        try {
            //setLoading(true);
            //const dataArray = [createdData];
            const apiResponse = await Api.post(url, createdData); // Adjust the HTTP method as needed
            if (!apiResponse.data) {
                throw new Error('No data in API response');
            }
            setData(apiResponse.data);
            console.log(apiResponse.status);
            setLoading(false);
            return apiResponse.status;

        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message;
            setError(errorMessage);
            setLoading(false);
            return false;
        }
    };

    const updateData = async (updatedData: { [key: string]: any; }) => {
        setLoading(true);
        setError(null);
        try {
            //setLoading(true);
            //const dataArray = [createdData];
            const apiResponse = await Api.put(url, updatedData); // Adjust the HTTP method as needed
            if (!apiResponse.data) {
                throw new Error('No data in API response');
            }
            setData(apiResponse.data);
            console.log(apiResponse.status);
            setLoading(false);
            return apiResponse.status;

        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message;
            setError(errorMessage);
            setLoading(false);
            return false;
        }
    };



    return { data, error, loading, createData, updateData };
};

export default useCreateData;
