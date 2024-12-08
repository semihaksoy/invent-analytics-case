import { Input } from "antd";
import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";

interface InputComponentProps {
  title?: string;
  isRequired?: boolean;
  value?: string | number | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: boolean;
  size?: "small" | "middle" | "large";
  className?: string;
  disabled?: boolean;
  debounceDelay?: number;
}

const InputComponent: React.FC<InputComponentProps> = ({
  value = "",
  onChange,
  placeholder = "",
  error = false,
  size = "middle",
  className,
  disabled,
  debounceDelay = 500,
}) => {
  const [localValue, setLocalValue] = useState<string | number>(value || "");
  const status = error ? "error" : undefined;

  const debouncedChange = useCallback(
    debounce((event: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(event);
      }
    }, debounceDelay),
    [onChange, debounceDelay]
  );

  useEffect(() => {
    return () => {
      debouncedChange.cancel();
    };
  }, [debouncedChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
    debouncedChange(e);
  };

  return (
    <Input
      size={size}
      status={status}
      value={localValue}
      onChange={handleChange}
      disabled={disabled}
      className={className}
      placeholder={placeholder}
    />
  );
};

export default InputComponent;
