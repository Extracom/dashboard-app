import { useEffect, useState } from "react";
import Api from '../api/Api';
import { getToken } from '../utils/utils';


const useFetchData = (url: string, body?: { [key: string]: any; }) => {
    const [data, setData] = useState<{ [key: string]: any; } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const refreshData = async () => {

        setLoading(true);

        const token = getToken();
        if (!token) {
            const errorMessage = "User session expired. Please sign in again.";
            setError(errorMessage);
            setLoading(false);
            return;
        }

        const requestConfig = {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        };



        // const localData = getDataFromLocalStorage(localStorageKey);
        // if (localData) {
        //     setData(localData);
        // }
        try {
            const apiResponse = await Api.post(url, body, requestConfig);
            if (!apiResponse.data) {
                throw new Error('No data in API response');
            }
            setData(apiResponse.data);
            //putDataToLocalStorage(localStorageKey, apiResponse.data);
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message;
            setError(errorMessage);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        refreshData();
    }, [url]);

    return { data, error, loading, refreshData };
};

export default useFetchData;