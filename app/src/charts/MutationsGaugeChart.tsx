import React from 'react';
import '../styles/App.css';
import ReactECharts from 'echarts-for-react';
import { CustomData } from '../interfaces/interfaces';

// Define the props for the component
interface ComponentProps {
    data?: CustomData | null; // properties passed as shortcode attributes
}

const Component: React.FC<ComponentProps> = ({ data }) => {
    // Check if data is not null
    if (!data) return (<></>);

    // Group the data by date and count the number of occurrences for each date
    const groupedData = data.reduce((acc: { [x: string]: any; }, cur: { createdDate: string; }) => {
        // Extract the date part of the createdDate string
        const date = cur.createdDate.split('T')[0];

        // If this date is not yet a key in the accumulator, add it with a count of 1
        // Otherwise, increment the count for this date
        acc[date] = (acc[date] || 0) + 1;

        return acc;
    }, {});

    // Convert the grouped data object to an array
    const groupedDataArray = Object.entries(groupedData);

    // Sort the array by date in ascending order
    const sortedGroupedDataArray = groupedDataArray.sort((a, b) => {
        return new Date(a[0]).getTime() - new Date(b[0]).getTime();
    });

    // Map the sorted array to get the quantities
    const quantitiesArray = sortedGroupedDataArray.map(item => item[1]);

    // Calculate the sum of the quantities
    const sumQuantities = quantitiesArray.reduce((a, b) => Number(a) + Number(b), 0);

    let averageQuantities: Number = 0;
    // Calculate the average of the quantities
    if (quantitiesArray.length > 0) {
        averageQuantities = Number(Number(Number(sumQuantities) / quantitiesArray.length).toFixed(1));
    }

    // Define the options for the ECharts gauge chart
    const options = {
        tooltip: {
            formatter: '{a} <br/>{b} : {c}%'
        },

        series: [
            {
                name: 'Pressure',
                type: 'gauge',
                min: 0,     // Minimum scale value
                max: 10,    // Maximum scale value
                axisLine: {
                    lineStyle: {
                        width: 10,
                        color: [
                            [0.35, '#fd666d'],
                            [0.6, '#37a2da'],
                            [1, '#74e0da']
                        ]
                    }
                },

                detail: {
                    valueAnimation: true,
                    formatter: '{value}'
                },
                data: [
                    {
                        value: averageQuantities,
                        name: 'Avg. Mutation'
                    }
                ]
            }
        ]
    };

    // Return the ECharts component with the defined options
    return (
        <ReactECharts option={options} style={{ height: '100%', width: '100%' }} />
    );
};

export default Component;
