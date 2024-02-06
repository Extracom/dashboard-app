import { useEffect, useState } from "react";
import { DashboardFilter } from '../interfaces/interfaces';
import useFetchData from '../hooks/useFetchData';
import { aggregateMutations } from '../utils/DataConversion';


const useFetchDashboardData = (filter?: DashboardFilter) => {
    const [data, setData] = useState<{ [key: string]: any; } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { data: mutationData, error: mutationError, loading: mutationLoading, refreshData: refreshMutationData } = useFetchData('');

    const refreshData = async (filter?: DashboardFilter) => {

        let body: { [key: string]: any } = {
            "skipPaging": true
        };
        if (filter && filter.fromDate) {
            body["from"] = filter.fromDate.toISOString().slice(0, 10);
        }
        if (filter && filter.toDate) {
            body["to"] = filter.toDate.toISOString().slice(0, 10);
        }
        // Call the refreshData function for mutations, async
        refreshMutationData(`/stockmutation/list`, body);
        // Do something with the data, error, and loading values from useFetchData
        // setData(mutationData);
        // setError(mutationError);
        // setLoading(mutationLoading);

    }

    useEffect(() => {
        refreshData(filter);
    }, []);

    useEffect(() => {
        if (mutationData && mutationData.data) {
            setData(aggregateMutations(mutationData.data));
        }
    }, [mutationData]);

    useEffect(() => {
        setError(mutationError);
    }, [mutationError]);

    useEffect(() => {
        setLoading(mutationLoading);
    }, [mutationLoading]);


    return { data, error, loading, refreshData };
};

export default useFetchDashboardData;