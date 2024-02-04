import React from 'react';
import '../styles/App.css';
import ReactECharts from 'echarts-for-react';
import { CustomData } from '../interfaces/interfaces';

interface ComponentProps {
    data?: CustomData | null; // properties passed as shortcode attributes
}

const Component: React.FC<ComponentProps> = ({ data }) => {
    // Define your chart options

    if (!data) return (<></>);

    const groupedData = data.reduce((acc: { [x: string]: any; }, cur: { createdDate: string; }) => {
        // Extract the date part of the createdDate string
        const date = cur.createdDate.split('T')[0];

        // If this date is not yet a key in the accumulator, add it with a count of 1
        // Otherwise, increment the count for this date
        acc[date] = (acc[date] || 0) + 1;

        return acc;
    }, {});

    const groupedDataArray = Object.entries(groupedData);

    // Sort the array by date in ascending order
    const sortedGroupedDataArray = groupedDataArray.sort((a, b) => {
        return new Date(a[0]).getTime() - new Date(b[0]).getTime();
    });

    const datesArray = sortedGroupedDataArray.map(item => item[0]);
    const quantitiesArray = sortedGroupedDataArray.map(item => item[1]);

    const options = {
        grid: {
            containLabel: true,
            left: '12px',
            right: '6px',
            top: '12px',
            bottom: '26px'
        },
        tooltip: {},
        legend: {
            data: ['Mutations'],
            orient: 'horizontal',
            bottom: -5,
            icon: 'circle',
            //inactiveColor: '#39416E',
            itemGap: 25,
        },
        xAxis: {
            data: datesArray,
            axisLine: { show: false },
            axisLabel: {
                formatter: function (value: string) {
                    const date = new Date(value);
                    const month = date.toLocaleString('default', { month: 'short' });
                    const day = date.getDate();
                    return `${month} ${day}`;
                }
            }
        },
        yAxis: {},
        series: [{
            name: 'Mutations',
            type: 'bar',
            data: quantitiesArray,
            itemStyle: {
                color: '#74e0da', // Set item color 
                shadowBlur: 0,
                shadowColor: 'transparent',
                borderWidth: 0,
                opacity: 1,
                borderRadius: [5, 5, 5, 5] // Add this line
            },
        }]
    };

    // Return ReactECharts with options prop
    return (
        <ReactECharts option={options} style={{ height: '100%', width: '100%' }} />
    );
};

export default Component;
