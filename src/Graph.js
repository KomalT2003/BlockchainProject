import React, { useState } from 'react';
import TestScoreChart from './components/TestScoreChart';

const Graph = () => {
  const testScores = {
    test1: {
      dates: [
        '2023-07-15', '2023-07-16', '2023-07-17', '2023-07-18', '2023-07-19', '2023-07-20',
        '2023-07-21', '2023-07-22', '2023-07-23', '2023-07-24', '2023-07-25', '2023-07-26',
      ],
      scores: [80, 85, 90, 78, 10, 20, 30, 40, 50, 60, 70, 80],
      attempts: 2,
    },
    test2: {
      dates: [
        '2023-07-15', '2023-07-16', '2023-07-17', '2023-07-18', '2023-07-19', '2023-07-20',
        '2023-07-21', '2023-07-22', '2023-07-23', '2023-07-24', '2023-07-25', '2023-07-26',
      ],
      scores: [20, 80, 50, 90, 60, 30, 70, 40, 100, 45, 55, 80],
      attempts: 1,
    },
    test3: {
      dates: [
        '2023-07-15', '2023-07-16', '2023-07-17', '2023-07-18', '2023-07-19', '2023-07-20',
        '2023-07-21', '2023-07-22', '2023-07-23', '2023-07-24', '2023-07-25', '2023-07-26',
      ],
      scores: [50, 80, 70, 30, 60, 90, 40, 20, 80, 75, 45, 65],
      attempts: 2,
    },
    // Add more tests...
  };
  

  const [selectedTest, setSelectedTest] = useState('test1');

  return (
    <div>
      <h1>Test Score Dashboard</h1>
      <div>
        <label>Select Test:</label>
        <select
          value={selectedTest}
          onChange={(e) => setSelectedTest(e.target.value)}
        >
          <option value="test1">Test 1</option>
          <option value="test2">Test 2</option>
          <option value="test3">Test 3</option>
          {/* options */}
        </select>
      </div>
      <TestScoreChart testScores={testScores} selectedTest={selectedTest} />
    </div>
  );
};

export default Graph;
