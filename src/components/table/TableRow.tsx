import React from 'react';

interface TableRowProps {
  data: (string | number | boolean | React.ReactNode)[];
}

const TableRow: React.FC<TableRowProps> = ({ data }) => {
  return (
    <tr>
      {data.map((cell, index) => (
        <td key={index} className="px-6 py-4 whitespace-nowrap">
          {cell}
        </td>
      ))}
    </tr>
  );
};

export default TableRow;