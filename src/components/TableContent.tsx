import { ScrollArea, Table, Text } from "@mantine/core";
import { TableRow } from "../interfaces/types";

/**
 * TableComponent displays agricultural data in a scrollable table format
 * @param data - Array of TableRow objects containing year and crop production data
 */
const TableComponent: React.FC<{ data: TableRow[] }> = ({ data }) => (
  // ScrollArea component provides scrolling functionality with fixed height
  <ScrollArea h={500}>
    {/* 
      Mantine Table component with the following features:
      - striped: Alternate row colors for better readability
      - highlightOnHover: Highlights rows on mouse hover
      - withTableBorder: Adds border around the table
      - withColumnBorders: Adds borders between columns
    */}
    <Table
      striped
      stripedColor="#CECECE"
      highlightOnHover
      withTableBorder
      withColumnBorders
    >
      {/* Table header section */}
      <Table.Thead>
        <Table.Tr>
          {/* Column headers with centered text alignment */}
          <Table.Th style={{ textAlign: "center" }}>Year</Table.Th>
          <Table.Th style={{ textAlign: "center" }}>
            Crop with Maximum Production
          </Table.Th>
          <Table.Th style={{ textAlign: "center" }}>
            Crop with Minimum Production
          </Table.Th>
        </Table.Tr>
      </Table.Thead>

      {/* Table body section */}
      <Table.Tbody>
        {/* Map through data array to create table rows */}
        {data.map((row, index) => (
          <Table.Tr
            key={index}
          >
            {/* Year column with medium text size and semi-bold weight */}
            <Table.Td style={{ textAlign: "center" }}>
              <Text size="md" fw={500}>{row.year}</Text>
            </Table.Td>
            {/* Maximum production crop column */}
            <Table.Td style={{ textAlign: "center" }}>{row.maxCrop}</Table.Td>
            {/* Minimum production crop column */}
            <Table.Td style={{ textAlign: "center" }}>{row.minCrop}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  </ScrollArea>
);

export default TableComponent;