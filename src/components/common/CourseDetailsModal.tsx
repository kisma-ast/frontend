import React from 'react';
import { Cours } from '../../types/types';

interface ModalProps {
  course: Cours | null;
  onClose: () => void;
}

const CourseDetailsModal: React.FC<ModalProps> = ({ course, onClose }) => {
  if (!course) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-xl font-bold mb-4">Détails du Cours</h3>
        <p><strong>ID:</strong> {course.id}</p>
        <p><strong>Nom:</strong> {course.nom}</p>
        <p><strong>Heure Debut:</strong> {course.heureDebut}</p>
        <p><strong>Heure Fin:</strong> {course.heureFin}</p>

        <div className="mt-4 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsModal;
