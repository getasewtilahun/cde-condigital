import React, { FC, useState } from "react";
import { Button, Menu, Dropdown } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

interface ColumnVisibilityProps {
    columns: any[]; // Array of column definitions
    onColumnVisibilityChange: (key: string, visible: boolean) => void;
}

const ColumnVisibility: FC<ColumnVisibilityProps> = ({
    columns,
    onColumnVisibilityChange,
}) => {
    const [visibleColumns, setVisibleColumns] = useState<{ [key: string]: boolean }>(
        columns.reduce((acc, column) => {
            acc[column.key] = true;
            return acc;
        }, {})

    );
    console.log("This is column visibility")

    const toggleColumnVisibility = (key: string) => {
        const updatedVisibleColumns = { ...visibleColumns, [key]: !visibleColumns[key] };
        setVisibleColumns(updatedVisibleColumns);
        onColumnVisibilityChange(key, updatedVisibleColumns[key]);
    };

    const menu = (
        <Menu>
            {columns.map((column) => (
                <Menu.Item key={column.key} onClick={() => toggleColumnVisibility(column.key)}>
                    {visibleColumns[column.key] ? (
                        <EyeOutlined />
                    ) : (
                        <EyeInvisibleOutlined />
                    )}
                    {column.title}
                </Menu.Item>
            ))}
        </Menu>
    );

    return (
        <Dropdown overlay={menu} trigger={["click"]}>
            <Button>Column Visibility</Button>
        </Dropdown>
    );
};

export default ColumnVisibility;
