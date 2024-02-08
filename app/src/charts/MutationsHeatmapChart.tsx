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

    const options = {
        tooltip: {
            position: 'bottom'
        },
        grid: {
            // height: '50%',
            // y: '10%'
            left: '8%',
            right: '6px',
            top: '12px',
            bottom: '72px'
        },
        xAxis: {
            type: 'category',
            data: data.dates,
            splitArea: {
                show: true
            },
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
        yAxis: {
            type: 'category',
            data: data.users,
            splitArea: {
                show: true
            },
            axisLine: { show: false },
            axisLabel: {
                rotate: 0,
                margin: 5,
                interval: 0,


            },
        },
        visualMap: {
            min: 0,
            max: Math.max(...data.heatmap.map((item: any[]) => item[2])),
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: '-5',

        },
        series: [{
            name: 'Mutations',
            type: 'heatmap',
            data: data.heatmap,
            label: {
                show: true
            },
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };





    // const groupedDataArray = Object.entries(groupedData);

    // // Sort the array by date in ascending order
    // const sortedGroupedDataArray = groupedDataArray.sort((a, b) => {
    //     return new Date(a[0]).getTime() - new Date(b[0]).getTime();
    // });

    // const datesArray = sortedGroupedDataArray.map(item => item[0]);
    // const quantitiesArray = sortedGroupedDataArray.map(item => item[1]);

    // const options = {
    //     grid: {
    //         containLabel: true,
    //         left: '12px',
    //         right: '6px',
    //         top: '12px',
    //         bottom: '26px'
    //     },
    //     tooltip: {},
    //     legend: {
    //         data: ['Mutations1'],
    //         orient: 'horizontal',
    //         bottom: -5,
    //         icon: 'circle',
    //         //inactiveColor: '#39416E',
    //         itemGap: 25,
    //     },
    //     xAxis: {
    //         data: datesArray,
    //         axisLine: { show: false },
    //         axisLabel: {
    //             formatter: function (value: string) {
    //                 const date = new Date(value);
    //                 const month = date.toLocaleString('default', { month: 'short' });
    //                 const day = date.getDate();
    //                 return `${month} ${day}`;
    //             }
    //         }
    //     },
    //     yAxis: {},
    //     series: [{
    //         name: 'Mutations1',
    //         type: 'bar',
    //         data: quantitiesArray,
    //         itemStyle: {
    //             color: '#74e0da', // Set item color 
    //             shadowBlur: 0,
    //             shadowColor: 'transparent',
    //             borderWidth: 0,
    //             opacity: 1,
    //             borderRadius: [5, 5, 5, 5] // Add this line
    //         },
    //     }]
    // };

    // Return ReactECharts with options prop
    return (
        <ReactECharts option={options} style={{ height: '100%', width: '100%' }} />
    );
};

export default Component;
