import React, { useState, useEffect } from 'react';
import { Cours, Professeur } from '../../types/types';

interface FormSwapProps {
  cours?: Cours;
  nom: string;
  professeurId: string;
  profs: Professeur[];
  setNom: (value: string) => void;
  setProfesseurId: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  isEdit: boolean;
}

const FormSwap: React.FC<FormSwapProps> = ({
  cours, nom, setNom, professeurId, setProfesseurId,
  profs, onCancel, isEdit, handleSubmit
}) => {

  // Si c'est un formulaire d'édition, initialiser les valeurs des champs avec les données de "cours"
  useEffect(() => {
    if (isEdit && cours) {
      setNom(cours.nom);
      setProfesseurId(cours.professeur_id);
    }
  }, [isEdit, cours, setNom, setProfesseurId]);

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center p-4 z-50">
      <div className="bg-blue-800 p-4 rounded-lg shadow-md w-96 mx-auto">
        <h3 className="text-lg font-bold mb-4">{isEdit ? 'Modifier le Cours' : 'Ajouter un Cours'}</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nom" className="block text-sm font-medium text-white">
              Nom du Cours
            </label>
            <input
              id="nom"
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="w-full bg-blue-800  p-2 mt-1 border rounded-lg"
              placeholder="Nom du cours"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="professeur" className="block text-sm font-medium text-white">
              Professeur
            </label>
            <select
              id="professeur"
              value={professeurId}
              onChange={(e) => setProfesseurId(e.target.value)}
              className="w-full p-2 mt-1 rounded border bg-blue-700 text-white"
            >
              <option value="">Sélectionner</option>
              {profs.map((professeur) => (
                <option key={professeur.id} value={professeur.id}>
                  {professeur.user.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {isEdit ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormSwap;
