import React from "react";

interface Props {
  errorMessage: string;
}

const ErrorMessage: React.FC<Props> = ({ errorMessage }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-red-100">
      <div className="text-center p-6 bg-red-200 border border-red-300 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-red-700 mb-4">Error</h2>
        <p className="text-lg text-red-600">{errorMessage}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;
