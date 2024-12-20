import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

const TextArea: React.FC<TextAreaProps> = ({ error, className = '', ...props }) => {
  return (
    <div>
      <textarea
        {...props}
        className={`block w-full px-3 py-2.5 border rounded-lg shadow-sm 
          placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 
          sm:text-sm transition duration-150 ease-in-out resize-none
          ${error ? 'border-red-300' : 'border-gray-300'}
          ${className}`}
        rows={4}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default TextArea;