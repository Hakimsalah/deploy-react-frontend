import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import  '../../../assets/css/Stats/Overview/transplantDemographics.css';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const TransplantDemographicsChart = () => {
  // Data for bar chart (Age medians and limits)
  const barData = {
    labels: ['Autograft Median', 'Allograft Median', 'Autograft Max Age (LH/LNH)', 'Autograft Max Age (MM)', 'Allograft Max Age'],
    datasets: [
      {
        label: 'Age (Years)',
        data: [49, 23, 60, 65, 50],
        backgroundColor: ['rgba(75, 192, 192, 0.8)', 'rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)', 'rgba(255, 206, 86, 0.8)', 'rgba(153, 102, 255, 0.8)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(153, 102, 255, 1)'],
        borderWidth: 1,
        borderRadius: 6,
        barThickness: 25,
      },
    ],
  };

  // Data for pie chart (Sex Ratio and Under 18 for Allografts)
  const pieData = {
    labels: ['Male (Sex Ratio)', 'Female (Sex Ratio)', 'Under 18 (Allograft)', 'Over 18 (Allograft)'],
    datasets: [
      {
        data: [1.5 / (1.5 + 1), 1 / (1.5 + 1), 32, 68], // Sex ratio approximated, Under 18% and complement
        backgroundColor: ['rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)', 'rgba(255, 206, 86, 0.8)', 'rgba(75, 192, 192, 0.8)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
        borderWidth: 1,
      },
    ],
  };

  // Options for bar chart
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { color: '#333', font: { size: 14 } } },
      title: {
        display: true,
        text: 'Age Distribution and Limits for Transplants',
        color: '#2c3e50',
        font: { size: 18, weight: 'bold' },
      },
      tooltip: {
        backgroundColor: 'rgba(44, 62, 80, 0.9)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    },
    scales: {
      x: { ticks: { color: '#7f8c8d' }, grid: { color: 'rgba(0, 0, 0, 0.05)' } },
      y: { beginAtZero: true, ticks: { color: '#7f8c8d', stepSize: 10, max: 70 }, grid: { color: 'rgba(0, 0, 0, 0.05)' } },
    },
  };

  // Options for pie chart
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right', labels: { color: '#333', font: { size: 14 } } },
      title: {
        display: true,
        text: 'Sex Ratio and Age Distribution (Allografts)',
        color: '#2c3e50',
        font: { size: 18, weight: 'bold' },
      },
    },
  };

  return (
    <div className="transplantChartContainer">
      <div style={{fontFamily: "Roboto", fontSize: "18px", flex: "0.3", padding: "10px 20px"}}>
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
       totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. 
       Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, 
       sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."" 
       
      </div>
      <div className="chartSection">
        <div className="barChartWrapper">
          <Bar data={barData} options={barOptions} />
        </div>
        <div className="pieChartWrapper">
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>

    </div>
  );
};

export default TransplantDemographicsChart;