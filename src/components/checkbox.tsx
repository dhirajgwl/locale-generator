 "use client"
import React, { useState } from 'react';

interface CheckboxProps {
  label: string;
  checked?: boolean;
  value?: string;
  onChange?: (checked: HTMLInputElement) => void;
}


const Checkbox: React.FC<CheckboxProps> = ({ label, value, checked = false, onChange }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    if (onChange) {
      onChange(event.target);
    }
  };

  return (
    <label className="flex items-center cursor-pointer">
    <input
      type="checkbox"
      checked={isChecked}
      onChange={handleCheckboxChange}
      value={value}
      className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
    />
    <span className="ml-2 text-gray-700">{label}</span>
  </label>
  );
};

export default Checkbox;
