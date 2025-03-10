import { FaEllipsisV } from 'react-icons/fa';
import InputSearch from '../../components/common/InputSearch';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Classe } from '../../types/types';
import axios from 'axios';

function ClassePage() {
  const [classes, setClasses] = useState<Classe[]>([]); // State for storing class data
  const [searchClasse, setSearchClasse] = useState<string>(""); // State for search text
  const [dropdownStates, setDropdownStates] = useState<{ [key: number]: boolean }>({}); // State for dropdowns
  const [showAdd, setShowAdd] = useState(false); // Show Add form
  const [showEdit, setShowEdit] = useState(false); // Show Edit form
  const [selectedClasse, setSelectedClasse] = useState<Classe | null>(null); // For editing class
  const [nom, setNom] = useState(''); // For class name in Add/Edit form
  const [niveau, setNiveau] = useState(''); // For level in Add/Edit form
  const backendUrlNet = 'http://127.0.0.1:8000/api';

  // Function to fetch classes data
  const fetchClasses = useCallback(async () => {
    try {
      const response = await axios.get(`${backendUrlNet}/classes`);
      if (response.status === 200) {
        setClasses(response.data);
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  }, [backendUrlNet]);

  // Fetch classes on component mount
  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  // Filter classes based on search input
  const filteredClasses = classes.filter((classe) =>
    classe.nom.toLowerCase().includes(searchClasse.toLowerCase())
  );

  // Toggle dropdown for a specific class
  const toggleDropdown = (id: number) => {
    setDropdownStates(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Handle adding a new class
  const handleAddClasse = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate input fields
    if (!nom || !niveau) {
      console.error("Le nom de la classe ou le niveau n'est pas défini.");
      return;
    }
  
    const newClasse = {
      nom,
      niveau,
    };
  
    try {
      const response = await axios.post(`${backendUrlNet}/classes`, newClasse);
  
      if (response.status === 201) {
        console.log("Classe ajoutée avec succès :", response.data);
        fetchClasses(); // Reload classes after adding
        resetForm();
      } else {
        console.error("Erreur lors de l'ajout de la classe, statut non OK :", response.status);
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de la classe :", error);
    }
  };

  // Handle editing an existing class
  const handleEditClasse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClasse?.id) return;

    const updatedClasse = {
      nom,
      niveau,
    };

    try {
      const response = await axios.put(`${backendUrlNet}/classes/${selectedClasse.id}`, updatedClasse);
      if (response.status === 200) {
        setClasses((prevClasses) =>
          prevClasses.map((classe) =>
            classe.id === selectedClasse.id ? { ...classe, ...updatedClasse } : classe
          )
        );
        resetForm();
      }
    } catch (error) {
      console.error("Error editing class:", error);
    }
  };

  // Handle deleting a class
  const handleDeleteClasse = async (id: number) => {
    try {
      const response = await axios.delete(`${backendUrlNet}/classes/${id}`);
      if (response.status === 200 || response.status === 204) {
        setClasses(prevClasses => prevClasses.filter(classe => classe.id !== id));
        // Close dropdown after delete
        setDropdownStates(prev => ({
          ...prev,
          [id]: false
        }));
      }
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  };

  // Reset form and close modals
  const resetForm = () => {
    setShowAdd(false);
    setShowEdit(false);
    setNom('');
    setNiveau('');
    setSelectedClasse(null);
  };
  const dropdownRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const tableHeaders = [
    { id: "id", label: "ID" },
    { id: "nom", label: "Nom" },
    { id: "niveau", label: "Niveau" },
    { id: "action", label: "Action" }
  ];

  return (
    <div className="bg-white/5 p-2 sm:p-4 rounded-lg shadow-md text-white">
      <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">Classes</h2>

      {/* Search Input */}
      <InputSearch
        SearchData={searchClasse}
        onSearchChange={setSearchClasse}
        placeholder="Entrer le nom de la classe"
      />

      <div className="mt-4 flex justify-end">
        <button
          onClick={() => setShowAdd(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Ajouter une Classe
        </button>
      </div>

      <div className="mt-4">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-blue-800">
              {tableHeaders.map((header) => (
                <th key={header.id} className="px-1 py-1 sm:px-2 md:px-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider whitespace-nowrap">
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-700">
            {filteredClasses.length > 0 ? (
              filteredClasses.map((classe) => (
                <tr key={classe.id} className="hover:bg-blue-900/30">
                  <td className="px-1 py-1 sm:px-2 md:px-4 text-xs sm:text-sm text-gray-100">{classe.id}</td>
                  <td className="px-1 py-1 sm:px-2 md:px-4 text-xs sm:text-sm text-gray-100">{classe.nom}</td>
                  <td className="px-1 py-1 sm:px-2 md:px-4 text-xs sm:text-sm text-gray-100">{classe.niveau}</td>
                  <td className="px-2 sm:px-4 md:px-6 py-2 text-sm text-gray-100 relative">
                     <div
                                     ref={(el) => (dropdownRefs.current[classe.id] = el)}
                                     className="relative inline-block"
                                   >
                                     <button
                                       className="p-1 sm:p-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                                       onClick={(e) => toggleDropdown(classe.id)}
                                       aria-label="Menu options"
                                     >
                                       <FaEllipsisV className="w-4 h-4" />
                                     </button>
                   
                                     {dropdownStates[classe.id] && (
                                       <div className="absolute right-0 w-48 rounded-md shadow-lg bg-blue-800 ring-1 ring-black ring-opacity-5 z-50">
                                         <div className="flex flex-col gap-1">
                                       
                                              <button
                            onClick={() => {
                              setShowEdit(true);
                              setSelectedClasse(classe);
                              setNom(classe.nom);
                              setNiveau(classe.niveau);
                              toggleDropdown(classe.id);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-white hover:bg-blue-700 transition-colors"
                          >
                            Modifier
                          </button>
                          <button
                            onClick={() => handleDeleteClasse(classe.id)}
                            className="w-full text-left px-4 py-2 text-sm text-white hover:bg-blue-700 transition-colors"
                          >
                            Supprimer
                          </button>
                                         </div>
                                       </div>
                                     )}
                                   </div>
                   
                  
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-gray-300">
                  Aucune classe trouvée
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Class Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-blue-800 p-4 rounded-lg shadow-md w-96 mx-auto">
            <h3 className="text-lg font-bold mb-4 text-white text-center">Ajouter une Classe</h3>
            <form onSubmit={handleAddClasse}>
              <div className="mb-4">
                <label htmlFor="nom" className="block text-sm font-medium text-white">
                  Nom de la Classe
                </label>
                <input
                  id="nom"
                  type="text"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  className="w-full p-2 mt-1 bg-blue-700 text-white border border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nom de la classe"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="niveau" className="block text-sm font-medium text-white">
                  Niveau
                </label>
                <input
                  id="niveau"
                  type="text"
                  value={niveau}
                  onChange={(e) => setNiveau(e.target.value)}
                  className="w-full p-2 mt-1 bg-blue-700 text-white border border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Niveau"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  onClick={resetForm}
                  type="button"
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Class Modal */}
      {showEdit && selectedClasse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-blue-800 p-4 rounded-lg shadow-md w-96 mx-auto">
            <h3 className="text-lg font-bold mb-4 text-white text-center">Modifier la Classe</h3>
            <form onSubmit={handleEditClasse}>
              <div className="mb-4">
                <label htmlFor="edit-nom" className="block text-sm font-medium text-white">
                  Nom de la Classe
                </label>
                <input
                  id="edit-nom"
                  type="text"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  className="w-full p-2 mt-1 bg-blue-700 text-white border border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nom de la classe"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="edit-niveau" className="block text-sm font-medium text-white">
                  Niveau
                </label>
                <input
                  id="edit-niveau"
                  type="text"
                  value={niveau}
                  onChange={(e) => setNiveau(e.target.value)}
                  className="w-full p-2 mt-1 bg-blue-700 text-white border border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Niveau"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  onClick={resetForm}
                  type="button"
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Modifier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClassePage;