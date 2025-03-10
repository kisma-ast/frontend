import { Cours } from '../../types/types';
import React, { useRef } from 'react';
import { FaEllipsisV } from "react-icons/fa";

const tableHeaders = [
  { id: "id", label: "ID", className: "" },
  { id: "nom", label: "Nom", className: "" },
  { id: "client", label: "Professeur", className: "" },
];

interface TablesCoursProps {
  cours: Cours[];
  dropdownStates: any;
  toggleDropdown: (value: number, e: React.MouseEvent) => void;
  onEdit: (course: Cours) => void;  // Handler for editing a course
  onDelete: (courseId: number) => void;  // Handler for deleting a course
  // onViewDetails: (courseId: number) => void;  // Handler for viewing course details
}

const Tables: React.FC<TablesCoursProps> = ({
  cours,
  dropdownStates,
  toggleDropdown,
  onEdit,
  onDelete,
  // onViewDetails,
}) => {
  const dropdownRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  return (
    <div>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-blue-800">
            {tableHeaders.map((header) => (
              <th
                key={header.id}
                className={`px-1 py-1 sm:px-2 md:px-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider whitespace-nowrap ${header.className}`}
              >
                {header.label}
              </th>
            ))}
            <th
              className={`px-1 py-1 sm:px-2 md:px-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider whitespace-nowrap `}
            >
              {" "}
              Action{" "}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-blue-700">
          {cours.map((cour) => (
            <tr key={cour.id}>
              <td className="px-1 py-1 sm:px-2 md:px-4 text-xs sm:text-sm text-gray-100 ">
                {cour.id}
              </td>
              <td className="px-1 py-1 sm:px-2 md:px-4 text-xs sm:text-sm text-gray-100 ">
                {cour.nom}
              </td>
              <td className="px-1 py-1 sm:px-2 md:px-4 text-xs sm:text-sm text-gray-100 ">
                {cour.professeur.user.name}
              </td>
              
              <td className="px-2 sm:px-4 md:px-6 py-2 text-sm text-gray-100 relative ">
                <div
                  ref={(el) => (dropdownRefs.current[cour.id] = el)}
                  className="relative inline-block"
                >
                  <button
                    className="p-1 sm:p-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                    onClick={(e) => toggleDropdown(cour.id, e)}
                    aria-label="Menu options"
                  >
                    <FaEllipsisV className="w-4 h-4" />
                  </button>

                  {dropdownStates[cour.id] && (
                    <div className="absolute right-0 w-48 rounded-md shadow-lg bg-blue-800 ring-1 ring-black ring-opacity-5 z-50">
                      <div className="flex flex-col gap-1">
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-white hover:bg-blue-700 transition-colors"
                          onClick={() => {
                            // onViewDetails(cour.id);  // View details
                            toggleDropdown(cour.id, {} as React.MouseEvent); // Close dropdown
                          }}
                        >
                          Détails du Cours
                        </button>
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-white hover:bg-blue-700 transition-colors"
                          onClick={() => {
                            onEdit(cour);  // Edit course
                            toggleDropdown(cour.id, {} as React.MouseEvent); // Close dropdown
                          }}
                        >
                          Modifier le Cours
                        </button>
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-white hover:bg-blue-700 transition-colors"
                          onClick={() => {
                            onDelete(cour.id);  // Delete course
                            toggleDropdown(cour.id, {} as React.MouseEvent); // Close dropdown
                          }}
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tables;
