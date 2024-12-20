import React from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const TextInput: React.FC<TextInputProps> = ({ error, className = '', ...props }) => {
  return (
    <div>
      <input
        {...props}
        className={`block w-full px-3 py-2.5 border rounded-lg shadow-sm 
          placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 
          sm:text-sm transition duration-150 ease-in-out
          ${error ? 'border-red-300' : 'border-gray-300'}
          ${props.readOnly ? 'bg-gray-50' : 'bg-white'}
          ${className}`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default TextInput;