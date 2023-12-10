import React from 'react';
import WineStatsComponent from './utils/WineStatsComponent';
import wineData from './wineData'; // Assuming you have your data in a file named data.js

function App() {
    return (
        <div className="App">
            <WineStatsComponent data={wineData} />
        </div>
    );
}

export default App;
