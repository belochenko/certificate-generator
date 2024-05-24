"use client";
import { useState } from "react";

const UploadTable = ({ data, selectedRows, handleRowSelect }) => (
  <div className="mt-6 overflow-x-auto max-h-96">
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead className="bg-gray-50 dark:bg-gray-800">
        <tr>
          <th>
            <input
              type="checkbox"
              checked={selectedRows.length === data.length}
              onChange={() =>
                handleRowSelect(
                  selectedRows.length === data.length
                    ? []
                    : data.map((_, i) => i),
                )
              }
            />
          </th>
          {Object.keys(data[0]).map((key) => (
            <th
              key={key}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
            >
              {key}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
        {data.map((row, index) => (
          <tr key={index}>
            <td>
              <input
                type="checkbox"
                checked={selectedRows.includes(index)}
                onChange={() => {
                  const newSelectedRows = selectedRows.includes(index)
                    ? selectedRows.filter((i) => i !== index)
                    : [...selectedRows, index];
                  handleRowSelect(newSelectedRows);
                }}
              />
            </td>
            {Object.values(row).map((value, idx) => (
              <td
                key={idx}
                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
              >
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default UploadTable;
