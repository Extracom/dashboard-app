import React from 'react';
import '../styles/App.css';
import ReactECharts from 'echarts-for-react';
import { CustomData } from '../interfaces/interfaces';

interface ComponentProps {
    data?: CustomData | null; // properties passed as shortcode attributes
    wide?: boolean;
}

const Component: React.FC<ComponentProps> = ({ data }) => {
    // Define your chart options

    if (!data) return (<></>);


    const datesArray = data.dateMutationsDual.map((item: any[]) => item[0]);
    const quantitiesArray = data.dateMutationsDual.map((item: any[]) => item[1]);

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
