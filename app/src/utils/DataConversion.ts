import { CustomData } from '../interfaces/interfaces';

export function aggregateMutations(data: CustomData): CustomData {

    let userSet = new Set();
    let dateSet = new Set();

    const groupedDataByUserAndDate = data.reduce((acc: { [x: string]: any; }, cur: { createdDate: string, user: string }) => {
        // Extract the date part of the createdDate string
        const date = cur.createdDate.split('T')[0];
        const user = cur.user;

        // Initialize this date and user in the accumulator if it doesn't exist
        if (!acc[user]) {
            acc[user] = {};
        }
        // If this date is not yet a key in the accumulator, add it with a count of 1
        // Otherwise, increment the count for this date
        acc[user][date] = (acc[user][date] || 0) + 1;

        userSet.add(user);
        dateSet.add(date);

        return acc;
    }, {});


    const usersArray = [...userSet];
    const datesArray = [...dateSet].reverse();

    let heatmapData = (datesArray as string[]).flatMap(date =>
        (usersArray as string[]).map(user => [date, user, groupedDataByUserAndDate[user][date] || 0])
    );


    const groupedDataByDate = data.reduce((acc: { [x: string]: any; }, cur: { createdDate: string; }) => {
        // Extract the date part of the createdDate string
        const date = cur.createdDate.split('T')[0];

        // If this date is not yet a key in the accumulator, add it with a count of 1
        // Otherwise, increment the count for this date
        acc[date] = (acc[date] || 0) + 1;

        return acc;
    }, {});

    const groupedDataByDateArray = Object.entries(groupedDataByDate);

    // Sort the array by date in ascending order
    const sortedGroupedDataArray = groupedDataByDateArray.sort((a, b) => {
        return new Date(a[0]).getTime() - new Date(b[0]).getTime();
    });

    return {
        users: usersArray,
        dates: datesArray,
        mutationsByUserAndDate: groupedDataByUserAndDate,
        mutationsByDate: groupedDataByDate,
        dateMutationsDual: sortedGroupedDataArray,
        heatmap: heatmapData,
    }

}