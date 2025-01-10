import { useEffect, useRef } from "react";
import { BarChartData } from "../interfaces/types";
import * as echarts from "echarts";
import type { ECharts } from "echarts";

const BarChart: React.FC<{ data: BarChartData[] }> = ({ data }) => {
  const chartRef = useRef<ECharts>();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Wait for the container to be available
    if (!containerRef.current) return;

    // Initialize the chart
    const initChart = () => {
      if (!containerRef.current) return;
      
      // Dispose of existing chart instance if it exists
      if (chartRef.current) {
        chartRef.current.dispose();
      }

      // Create new chart instance
      chartRef.current = echarts.init(containerRef.current, "default");

      // Set chart options
      chartRef.current.setOption({
        grid: {
          top: 40,
          right: 20,
          bottom: 70,
          left: 50,
          containLabel: true // Ensures labels are included in grid calculation
        },
        xAxis: {
          type: "category",
          data: data.map((item) => item.crop),
          axisLabel: {
            rotate: 45,
            color: "#333",
            fontSize: 12,
            overflow: 'break' // Handle long labels
          },
          name: 'Crop',
          nameLocation: 'center',
          nameGap: 70, // Distance between axis name and axis line
          nameTextStyle: {
            fontSize: 14,
            fontWeight: 'bold',
            color: '#333'
          }
        },
        yAxis: {
          type: "value",
          axisLabel: {
            color: "#333",
            fontSize: 12
          },
          name: 'Average Yield of the Crop between 1950-2020',
          nameLocation: 'middle',
          nameGap: 65, // Distance between axis name and axis line
          nameTextStyle: {
            fontSize: 10,
            fontWeight: 'bold',
            color: '#333'
          }
        },
        series: [
          {
            data: data.map((item) => item.averageYield),
            type: "bar",
            itemStyle: {
              color: "#4caf50"
            }
          }
        ],
        tooltip: {
          trigger: "axis"
        }
      });
    };

    // Initialize chart
    initChart();

    // Handle window resize
    const handleResize = () => {
      if (chartRef.current) {
        chartRef.current.resize();
      }
    };

    // Add window resize listener
    window.addEventListener("resize", handleResize);

    // Handle container resize using ResizeObserver
    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
      if (chartRef.current) {
        chartRef.current.dispose();
      }
    };
  }, [data]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "400px",
        margin: "20px 0",
        border: "1px solid #e0e0e0",
        borderRadius: "20px"
      }}
    />
  );
};

export default BarChart;