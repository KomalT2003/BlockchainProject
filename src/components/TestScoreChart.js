import React, { useState } from 'react';
import { Line, Pie } from 'react-chartjs-2';

const TestScoreChart = ({ testScores, selectedTest }) => {
  const [startIndex, setStartIndex] = useState(0);

  // Extract the data for the selected test
  const dates = testScores[selectedTest].dates.slice(startIndex, startIndex + 5);
  const scores = testScores[selectedTest].scores.slice(startIndex, startIndex + 5);

  console.log(dates,startIndex);
  console.log('====================================');

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Max Score',
        data: scores,
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.4)',
        borderColor: 'green',
        pointBackgroundColor: 'green',
        pointBorderColor: 'white',
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        tension: 0.4,
      },
    ],
  };

  const prevData = () => {
    setStartIndex((prevIndex) => (prevIndex - 5 + testScores[selectedTest].dates.length) % testScores[selectedTest].dates.length);
  };
  
  const nextData = () => {
    setStartIndex((prevIndex) => (prevIndex + 5) % testScores[selectedTest].dates.length);
  };
  

  const attemptsData = {
    labels: Object.keys(testScores),
    datasets: [
      {
        data: Object.values(testScores).map((test) => test.attempts),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          // Add more colors for additional tests...
        ],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: 'green',
        },
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Dates',
          font: {
            size: 16,
            weight: 'bold',
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Percentage (%)',
          font: {
            size: 16,
            weight: 'bold',
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
    layout: {
      padding: {
        top: 20,
        right: 30,
        bottom: 30,
        left: 30,
      },
    },
    maintainAspectRatio: false,
    aspectRatio: 2,
  };

  const attemptsOptions = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: 'black',
        },
      },
    },
    layout: {
      padding: {
        top: 20,
        right: 20,
        bottom: 0,
        left: 20,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div>
      <h2>Test Score Tracker</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={prevData} disabled={startIndex === 0}>Prev</button>
        <div style={{ width: '70%', height: '50vh' }}>
          <Line data={data} options={options} />
        </div>
        <button onClick={nextData} disabled={startIndex >= testScores[selectedTest].dates.length - 5}>Next</button>
      </div>
      <div style={{ width: '30%', height: '50vh' }}>
          <Pie data={attemptsData} options={attemptsOptions} />
        </div>
    </div>
  );
};

export default TestScoreChart;
