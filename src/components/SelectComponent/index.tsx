import { Select } from "antd";

interface Option {
    label: string;
    value: string;
}

interface SelectComponentProps {
    options: Option[];
    onChange?: (value: string, option?: Option | Option[] | undefined) => void;
    placeholder?: string;
    size ?: "small" | "middle" | "large";
    className?: string;
}

const SelectComponent = ({
    options,
    onChange,
    placeholder = "",
    size = "middle",
    className = "w-medium"
}: SelectComponentProps) => {
    return (
        <Select
            options={options}
            size={size}
            className={className}
            onChange={onChange}
            placeholder={placeholder}
        />
    );
};

export default SelectComponent;