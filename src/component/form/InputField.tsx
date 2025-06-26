import React from 'react';
interface InputProps {
  label: string;
  name: string;
  id?: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
}
const InputField: React.FC<InputProps> = ({ label, name, id, type = 'text', value, onChange, required = false, placeholder,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={id || name}>{label}</label>
      <input type={type} id={id || name} name={name} value={value} onChange={onChange} required={required} placeholder={placeholder} />
    </div>
  );
};

export default InputField;
