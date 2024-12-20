import React from 'react';

interface FormLayoutProps {
  title: string;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  actions?: React.ReactNode;
}

const FormLayout: React.FC<FormLayoutProps> = ({
  title,
  children,
  onSubmit,
  actions
}) => {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200">
        {title}
      </h1>
      <form onSubmit={onSubmit} className="space-y-8">
        {children}
        {actions && (
          <div className="pt-4 border-t border-gray-200 flex justify-end space-x-4">
            {actions}
          </div>
        )}
      </form>
    </div>
  );
};

export default FormLayout;