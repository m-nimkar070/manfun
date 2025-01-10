import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { useEffect, useState } from "react";
import data from "./Manufac_India_Agro_Dataset.json";
import { BarChartData, CropData, TableRow } from "./interfaces/types";
import TableComponent from "./components/TableContent";
import BarChart from "./components/BarChart";

function App() {
  /**
   * Processes raw agricultural data to generate table and chart data
   * @param rawData - Array of crop data entries containing year, crop name, production, and yield information
   * @returns Object containing processed data for both table and bar chart visualizations
   */
  const processData = (rawData: CropData[]) => {
    // Initialize data structures to store aggregated data
    const yearlyData: Record<string, { crop: string; production: number }[]> = {};
    const cropYield: Record<string, { totalYield: number; count: number }> = {};

    // Process each entry in the raw data
    rawData.forEach((entry) => {
      const {
        Year,
        "Crop Name": crop,
        "Crop Production (UOM:t(Tonnes))": production,
        "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": cropYieldProd,
      } = entry;

      // Convert production and yield values to numbers, handling potential string inputs
      const numericProduction = typeof production === "number" 
        ? production 
        : parseFloat(production) || 0;
      const numericYield = typeof cropYieldProd === "number" 
        ? cropYieldProd 
        : parseFloat(cropYieldProd) || 0;

      // Group data by year for the table visualization
      if (!yearlyData[Year]) {
        yearlyData[Year] = [];
      }
      yearlyData[Year].push({ crop, production: numericProduction });

      // Accumulate yield data for each crop for the bar chart
      if (!cropYield[crop]) {
        cropYield[crop] = { totalYield: 0, count: 0 };
      }
      cropYield[crop].totalYield += numericYield;
      // Only count entries with positive yield values
      cropYield[crop].count += numericYield > 0 ? 1 : 0;
    });

    // Process yearly data to find maximum and minimum production crops
    const tableData: TableRow[] = Object.entries(yearlyData).map(
      ([year, crops]) => {
        // Find crop with maximum production for the year
        const maxCropEntry = crops.reduce(
          (max, cropEntry) =>
            cropEntry.production > max.production ? cropEntry : max,
          { crop: "", production: 0 }
        );
        
        // Find crop with minimum production for the year
        const minCropEntry = crops.reduce(
          (min, cropEntry) =>
            cropEntry.production < min.production ? cropEntry : min,
          { crop: "", production: Infinity }
        );

        return {
          year,
          maxCrop: maxCropEntry.crop,
          minCrop: minCropEntry.crop,
        };
      }
    );

    // Calculate average yield for each crop for the bar chart
    const barChartData: BarChartData[] = Object.entries(cropYield).map(
      ([crop, { totalYield, count }]) => ({
        crop,
        averageYield: count > 0 ? totalYield / count : 0,
      })
    );

    return { tableData, barChartData };
  };

  // State to store processed data for both visualizations
  const [processedData, setProcessedData] = useState<{
    tableData: TableRow[];
    barChartData: BarChartData[];
  }>({ tableData: [], barChartData: [] });

  // Process data on component mount
  useEffect(() => {
    const { tableData, barChartData } = processData(data);
    setProcessedData({ tableData, barChartData });
  }, []);

  return (
    <MantineProvider>
      {/* Main container with styling */}
      <div
        style={{
          padding: "20px",
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#f9f9f9",
        }}
      >
        {/* Main heading */}
        <h1 style={{ textAlign: "center", color: "#333" }}>
          Agriculture Data Visualization
        </h1>

        {/* Table section */}
        <h2 style={{ color: "#4caf50", textAlign: "left", margin: "20px 0" }}>
          Table
        </h2>
        <TableComponent data={processedData.tableData} />

        {/* Bar chart section */}
        <h2 style={{ color: "#4caf50", textAlign: "left", margin: "20px 0" }}>
          Bar Chart
        </h2>
        <BarChart data={processedData.barChartData} />
      </div>
    </MantineProvider>
  );
}

export default App;