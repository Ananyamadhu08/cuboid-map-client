import React from "react";

interface InputProps {
  id: string;
  type: string;
  value: string;
  name?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  autoComplete?: string;
  pattern?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  ariaDescribedBy?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  type,
  value,
  name,
  onChange,
  placeholder = "",
  label,
  required = false,
  autoComplete,
  pattern,
  inputMode,
  ariaDescribedBy,
}) => {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        pattern={pattern}
        inputMode={inputMode}
        aria-describedby={ariaDescribedBy}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      />
    </div>
  );
};

export default Input;
