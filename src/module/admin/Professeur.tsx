import { FaEllipsisV } from 'react-icons/fa';
import InputSearch from '../../components/common/InputSearch';
import { Professeur } from '../../types/types'; // Removed unused Classe import
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

function ProfesseurPage() {
  const [professeurs, setProfesseurs] = useState<Professeur[]>([]); 
  const [searchProfesseur, setSearchProfesseur] = useState<string>(''); 
  const [dropdownStates, setDropdownStates] = useState<{ [key: number]: boolean }>({}); 
  const [showAdd, setShowAdd] = useState(false); 
  const [showEdit, setShowEdit] = useState(false); 
  const [selectedProfesseur, setSelectedProfesseur] = useState<Professeur | null>(null); 
  
  // States for form inputs
  const [nom, setNom] = useState<string>('');
  const [email, setEmail] = useState<string>(''); 
  const [password, setPassword] = useState<string>('');
  const backendUrlNet = 'http://127.0.0.1:8000/api';

  const fetchProfs = useCallback(async () => {
    try {
      const response = await axios.get(`${backendUrlNet}/professeurs`);
      if (response.status === 200) {
        setProfesseurs(response.data);
      }
    } catch (error) {
      console.error("Error fetching Profs:", error);
    }
  }, [backendUrlNet]);

  useEffect(() => {
    fetchProfs();
  }, [fetchProfs]); // Added fetchProfs to dependency array
  
  // Filter professors based on search input
  const filteredProfesseurs = professeurs.filter((professeur) =>
    professeur.user.name.toLowerCase().includes(searchProfesseur.toLowerCase()) 
  );

  // Toggle dropdown visibility
  const toggleDropdown = (id: number) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  // Handle adding a new professor
  const handleAddProf = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate input fields
    if (!nom || !email || !password) {
      console.error("Tous les champs sont obligatoires");
      return;
    }
  
    const newProfesseur = { // Changed variable name from newEtudiant to newProfesseur
      nom,
      email,
      password,
    };
  
    try {
      const response = await axios.post(`${backendUrlNet}/professeurs`, newProfesseur);
  
      if (response.status === 201) {
        console.log("Professeur ajouté avec succès :", response.data); // Updated log message
        fetchProfs(); // Reload data after adding
        resetForm();
      } else {
        console.error("Erreur lors de l'ajout du professeur, statut non OK :", response.status); // Updated error message
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du professeur :", error); // Updated error message
    }
  };

  // Handle editing an existing professor
  const handleEditProf = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProfesseur?.id) return;

    const updatedProfesseur = { // Changed variable name from updatedEtudiant to updatedProfesseur
      nom,
      email,
      password: password ? password : undefined // Only send password if it's changed
    };

    try {
      const response = await axios.put(`${backendUrlNet}/professeurs/${selectedProfesseur.id}`, updatedProfesseur);
      if (response.status === 200) {
        fetchProfs(); // Reload data to ensure we have the updated info
        resetForm();
      }
    } catch (error) {
      console.error("Error editing professor:", error); // Updated error message
    }
  };

  // Reset form and close modals
  const resetForm = () => {
    setShowAdd(false);
    setShowEdit(false);
    setNom('');
    setEmail('');
    setPassword('');
    setSelectedProfesseur(null);
  };

  // Handle deleting a professor
  const handleDeleteProfesseur = async (id: number) => {
    try {
      const response = await axios.delete(`${backendUrlNet}/professeurs/${id}`);
      if (response.status === 200 || response.status === 204) {
        setProfesseurs(prevProfesseurs => prevProfesseurs.filter(professeur => professeur.id !== id)); // Fixed variable names
        // Close dropdown after delete
        setDropdownStates(prev => ({
          ...prev,
          [id]: false
        }));
      }
    } catch (error) {
      console.error("Error deleting professor:", error); // Updated error message
    }
  };

  const tableHeaders = [
    { id: 'id', label: 'ID', className: '' },
    { id: 'nom', label: 'Nom', className: '' },
    { id: 'Email', label: 'Email', className: '' },
  ];

  return (
    <div className="bg-white/5 p-2 sm:p-4 rounded-lg shadow-md text-white">
      <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">Professeurs</h2>

      {/* Search Input */}
      <InputSearch
        SearchData={searchProfesseur}
        onSearchChange={setSearchProfesseur}
        placeholder="Rechercher un professeur"
      />

      <div className="mt-4 flex justify-end">
        <button
          onClick={() => setShowAdd(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Ajouter un Professeur
        </button>
      </div>

      <div className="mt-4">
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
              <th className="px-1 py-1 sm:px-2 md:px-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider whitespace-nowrap">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-700">
            {filteredProfesseurs.map((professeur) => (
              <tr key={professeur.id}>
                <td className="px-1 py-1 sm:px-2 md:px-4 text-xs sm:text-sm text-gray-100">{professeur.id}</td>
                <td className="px-1 py-1 sm:px-2 md:px-4 text-xs sm:text-sm text-gray-100">{professeur.user.name}</td>
                <td className="px-1 py-1 sm:px-2 md:px-4 text-xs sm:text-sm text-gray-100">{professeur.user.email}</td>

                <td className="px-2 sm:px-4 md:px-6 py-2 text-sm text-gray-100 relative">
                  <div className="relative inline-block">
                    <button
                      className="p-1 sm:p-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                      onClick={() => toggleDropdown(professeur.id)}
                      aria-label="Menu options"
                    >
                      <FaEllipsisV className="w-4 h-4" />
                    </button>

                    {dropdownStates[professeur.id] && (
                      <div className="absolute right-0 w-48 rounded-md shadow-lg bg-blue-800 ring-1 ring-black ring-opacity-5 z-50">
                        <div className="flex flex-col gap-1">
                          <button
                            className="w-full text-left px-4 py-2 text-sm text-white hover:bg-blue-700 transition-colors"
                            onClick={() => {
                              // handle view details
                              toggleDropdown(professeur.id); // Close dropdown
                            }}
                          >
                            Détails du Professeur
                          </button>
                          <button
                            className="w-full text-left px-4 py-2 text-sm text-white hover:bg-blue-700 transition-colors"
                            onClick={() => {
                              setSelectedProfesseur(professeur); // Set professor for editing
                              setNom(professeur.user.name); // Fixed to use user.name instead of nom
                              setEmail(professeur.user.email); // Fixed to use user.email instead of email
                              setPassword(''); // Reset password since we shouldn't display the current password
                              setShowEdit(true); // Show edit form
                              toggleDropdown(professeur.id); // Close dropdown
                            }}
                          >
                            Modifier le Professeur
                          </button>
                          <button
                            className="w-full text-left px-4 py-2 text-sm text-white hover:bg-blue-700 transition-colors"
                            onClick={() => {
                              handleDeleteProfesseur(professeur.id); // Delete professor
                              toggleDropdown(professeur.id); // Close dropdown
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

      {showAdd && (
        <div>
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
            <div className="bg-blue-800 p-4 rounded-lg shadow-md w-96 mx-auto">
              <h3 className="text-lg font-bold mb-4">Ajouter un Professeur</h3>
              <form onSubmit={handleAddProf}>
                <div className="mb-4">
                  <label htmlFor="nom" className="block text-sm font-medium text-white-700">
                    Nom du professeur
                  </label>
                  <input
                    id="nom"
                    type="text"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    className="w-full bg-blue-700 text-white p-2 mt-1 border rounded-lg"
                    placeholder="Nom du professeur"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-white">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email" // Changed from "text" to "email" for proper validation
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-blue-700 text-white p-2 mt-1 border rounded-lg"
                    placeholder="Email"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-white">
                    Mot de passe
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-blue-700 text-white p-2 mt-1 border rounded-lg"
                    placeholder="Mot de passe"
                    required
                  />
                </div>

                <div className="flex justify-center gap-5">
                  <button
                    onClick={() => setShowAdd(false)}
                    type="button"
                    className="px-4 py-2 bg-blue-400 text-white rounded-md hover:bg-blue-600"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-600"
                  >
                    Ajouter
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {showEdit && selectedProfesseur && (
        <div>
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
            <div className="bg-blue-800 p-4 rounded-lg shadow-md w-96 mx-auto">
              <h3 className="text-lg font-bold mb-4">Modifier un Professeur</h3>
              <form onSubmit={handleEditProf}>
                <div className="mb-4">
                  <label htmlFor="nom" className="block text-sm font-medium text-white">
                    Nom du professeur
                  </label>
                  <input
                    id="nom"
                    type="text"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    className="w-full bg-blue-700 text-white p-2 mt-1 border rounded-lg"
                    placeholder="Nom du professeur"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-white">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email" // Changed from "text" to "email" for proper validation
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-blue-700 text-white p-2 mt-1 border rounded-lg"
                    placeholder="Email"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-white">
                    Mot de passe
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-blue-700 text-white p-2 mt-1 border rounded-lg"
                    placeholder="Laisser vide pour ne pas modifier" // Updated placeholder
                  />
                </div>

                <div className="flex justify-center gap-5">
                  <button
                    onClick={() => setShowEdit(false)}
                    type="button"
                    className="px-4 py-2 bg-blue-400 text-white rounded-md hover:bg-blue-800 border-2 border-color-black"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-600"
                  >
                    Modifier
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfesseurPage;