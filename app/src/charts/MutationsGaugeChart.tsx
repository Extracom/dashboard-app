import React from 'react';
import '../styles/App.css';
import ReactECharts from 'echarts-for-react';
import { CustomData } from '../interfaces/interfaces';

// Define the props for the component
interface ComponentProps {
    data?: CustomData | null; // properties passed as shortcode attributes
    wide?: boolean;
    user: string;
}

const Component: React.FC<ComponentProps> = ({ data, user }) => {
    // Check if data is not null
    if (!data) return (<></>);

    let averageQuantities: Number = 0;

    const currentUserData = data.mutationsByUserAndDate[user];

    if (currentUserData) {
        const currentUserDataArray = Object.values(currentUserData);

        // // Map the sorted array to get the quantities
        // const quantitiesArray = data.dateMutationsDual.map((item: any[]) => item[1]);

        // Calculate the sum of the quantities
        const sumQuantities = currentUserDataArray.reduce((a: any, b: any) => Number(a) + Number(b), 0);


        // Calculate the average of the quantities
        if (currentUserDataArray.length > 0) {
            averageQuantities = Number(Number(Number(sumQuantities) / currentUserDataArray.length).toFixed(0));
        }

    }

    const maxScale = Number(averageQuantities) * 2;

    // Define the options for the ECharts gauge chart
    const options = {
        // tooltip: {
        //     formatter: '{a} <br/>{b} : {c}%'
        // },

        graphic: [
            {
                type: 'text',
                left: 'center',  // Position the text in the center
                bottom: 10,  // Position the text at the bottom
                style: {
                    text: user,  // The title text
                    textAlign: 'center',
                    fill: '#333',
                    fontSize: 16
                }
            }
        ],

        series: [
            {
                name: 'Pressure',
                type: 'gauge',
                min: 0,     // Minimum scale value
                max: maxScale,    // Maximum scale value
                axisLine: {
                    lineStyle: {
                        width: -6,
                        color: [
                            [0.35, '#fd666d'],
                            [0.6, '#37a2da'],
                            [1, '#74e0da']
                        ]
                    }
                },
                axisLabel: {
                    distance: 0,
                    formatter: function (value: number) {
                        // Format the value as needed
                        return value.toFixed(0); // This will format the value to 0 decimal places
                    },
                },

                detail: {
                    valueAnimation: true,

                    formatter: function (value: number) {
                        // Format the value as needed
                        return `0 / ${value}`; // This will format the value to 0 decimal places
                    },
                    fontSize: 16
                },
                data: [
                    {
                        value: averageQuantities,
                        //name: 'Avg. Mutation'
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
