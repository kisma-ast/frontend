// src/features/claims/components/ClaimsSearch.tsx
import React from 'react';

interface InputSearchProps {
  SearchData: string;
  placeholder: string;
  onSearchChange: (value: string) => void;
}

const InputSearch: React.FC<InputSearchProps> = ({ SearchData, onSearchChange ,placeholder}) => {
  return (
    <div className="mb-2 sm:mb-4">
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full">
        <input
          type="text"
          value={SearchData}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-2 sm:px-4 py-1 sm:py-2 rounded-md border bg-white/5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="w-full sm:w-auto px-4 py-1 sm:py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700 text-sm">
          Rechercher
        </button>
      </div>
    </div>
  );
};
export default InputSearch