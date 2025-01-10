// Types defined for CropData
export interface CropData {
  Year: string;
  "Crop Name": string;
  "Crop Production (UOM:t(Tonnes))": string | number;
  "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": string | number;
}

// Types defined for TableRow
export interface TableRow {
  year: string;
  maxCrop: string;
  minCrop: string;
}

// Types defined for BarChart
export interface BarChartData {
  crop: string;
  averageYield: number;
}
