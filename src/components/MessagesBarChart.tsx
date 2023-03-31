import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

export const MessagesBarChart = ({ messages, names } : {messages: number[], names: string[]}) => {
    let data = {
        labels: names,
        datasets: [
            {
                label: "Messages",
                data: messages,
                backgroundColor: 'rgb(32,196,148)',
            },
        
        ],
    }

    return <Bar data={data} />;

}