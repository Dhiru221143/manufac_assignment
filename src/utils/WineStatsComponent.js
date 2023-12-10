import React from 'react';
import style  from '../styleComp.css'; // The path should be relative to your component file

// Utility Functions
const calculateMean = (values) => {
    if (values.length === 0) return NaN;
    const sum = values.reduce((sum, value) => sum + parseFloat(value), 0);
    return sum / values.length;
  };
  
const calculateMedian = (values) => {
  const sortedValues = [...values].sort((a, b) => a - b);
  const midIndex = Math.floor(sortedValues.length / 2);
  return sortedValues.length % 2 !== 0
    ? sortedValues[midIndex]
    : (sortedValues[midIndex - 1] + sortedValues[midIndex]) / 2;
};

const calculateMode = (values) => {
  const frequencyMap = values.reduce((acc, value) => {
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(frequencyMap).reduce((current, [value, freq]) => {
    if (!current.freq || freq > current.freq) {
      return { value: parseFloat(value), freq };
    }
    return current;
  }, {}).value;
};

// Process data to get statistics
const getStatistics = (data, key) => {
  const classMap = data.reduce((acc, item) => {
    const classKey = item.Alcohol;
    acc[classKey] = acc[classKey] || [];
    acc[classKey].push(item[key]);
    return acc;
  }, {});

  return Object.keys(classMap).map((classKey) => {
    const values = classMap[classKey];
    return {
      class: classKey,
      mean: calculateMean(values),
      median: calculateMedian(values),
      mode: calculateMode(values),
    };
  });
};
// Utility function to render the table header
const renderTableHeader = (stats) => (
    <thead>
      <tr>
        <th>Measure</th>
        {stats.map((stat, index) => (
          <th key={index}>{`Class ${stat.class}`}</th>
        ))}
      </tr>
    </thead>
  );
  
  // Utility function to render the table body
  const renderTableBody = (stats, measure) => {
    const means = stats.map((stat) => stat.mean.toFixed(3));
    const medians = stats.map((stat) => stat.median.toFixed(3));
    const modes = stats.map((stat) => typeof stat.mode === 'number' ? stat.mode.toFixed(3) : 'N/A');
  
    return (
      <tbody>
        <tr>
          <td>{`${measure} Mean`}</td>
          {means.map((mean, index) => (
            <td key={index}>{mean}</td>
          ))}
        </tr>
        <tr>
          <td>{`${measure} Median`}</td>
          {medians.map((median, index) => (
            <td key={index}>{median}</td>
          ))}
        </tr>
        <tr>
          <td>{`${measure} Mode`}</td>
          {modes.map((mode, index) => (
            <td key={index}>{mode}</td>
          ))}
        </tr>
      </tbody>
    );
  };
  
  // Functional component
// Functional component
const WineStatsComponent = ({ data }) => {
    // Compute gamma values and add to data
    const dataWithGamma = data.map((item) => ({
      ...item,
      Gamma: (item.Ash * item.Hue) / item.Magnesium,
    }));
  
    const flavanoidsStats = getStatistics(data, 'Flavanoids');
    const gammaStats = getStatistics(dataWithGamma, 'Gamma');
  
    return (
      <div className="stats-container">
        <h1 className="title">Wine Statistics</h1>
        <h2 className="subtitle">Flavanoids</h2>
        <table className="stats-table">
          {renderTableHeader(flavanoidsStats)}
          {renderTableBody(flavanoidsStats, 'Flavanoids')}
        </table>
        <h2 className="subtitle">Gamma</h2>
        <table className="stats-table">
          {renderTableHeader(gammaStats)}
          {renderTableBody(gammaStats, 'Gamma')}
        </table>
      </div>
    );
  };
  
  export default WineStatsComponent;
  