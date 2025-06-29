import React from "react";

interface Column {
    name: string;
    thClassName?: string;
}

interface CustomTheadProps {
    columns: Column[];
}

const CustomThead: React.FC<CustomTheadProps> = ({ columns }) => {
    return (
        <thead className="bg-gray-200 text-gray-600 text-sm h-[70px]">
            <tr>
                {columns.map((col, index) => (
                    <th
                        key={index}
                        className={`px-4 py-3 ${col.thClassName ?? ""}`}
                    >
                        <span className="whitespace-nowrap">{col.name}</span>
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export default CustomThead;
