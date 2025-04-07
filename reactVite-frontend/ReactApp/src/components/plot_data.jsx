import React from "react";
import { useLocation } from "react-router-dom";

function DataPlot() {
    const location = useLocation();
    const data = location.state?.plotData;

    if (!data) return <p>No data to plot. Please go back and fetch data.</p>;

    return (
        <div>
            <h3>Data Received for Plotting:</h3>
            {console.log(data)}
        </div>
    );
}

export default DataPlot;