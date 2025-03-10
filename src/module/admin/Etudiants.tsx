import { FaEllipsisV } from 'react-icons/fa';
import InputSearch from '../../components/common/InputSearch';
import { Classe, Etudiant } from '../../types/types'; // Ensure Etudiant is defined in your types
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

function EtudiantPage() {
  const [etudiants, setEtudiants] = useState<Etudiant[]>([]); // State for storing student data
  const [searchEtudiant, setSearchEtudiant] = useState<string>(''); // State for search text
  const [dropdownStates, setDropdownStates] = useState<{ [key: number]: boolean }>({}); // State for dropdowns
  const [showAdd, setShowAdd] = useState(false); // State for showing the Add Etudiant form
  const [showEdit, setShowEdit] = useState(false); // State for showing the Edit Etudiant form
  const [selectedEtudiant, setSelectedEtudiant] = useState<Etudiant | null>(null); // Selected Etudiant for editing
  const [classes, setClasses] = useState<Classe[]>([]); // State for storing class data
  
  // States for form inputs
  const [nom, setNom] = useState<string>(''); // State for student's name
  const [classeId, setClasseId] = useState<string>(''); // State for student's class
  const [email, setEmail] = useState<string>(''); // State for student's email
  const [password, setPassword] = useState<string>(''); // State for student's password
  const backendUrlNet = 'http://127.0.0.1:8000/api';

  // Fetch students and classes data
  const fetchData = useCallback(async () => {
    try {
      const [etudiantsResponse, classesResponse] = await Promise.all([
        axios.get(`${backendUrlNet}/etudiants`),
        axios.get(`${backendUrlNet}/classes`)
      ]);
      
      if (etudiantsResponse.status === 200) {
        setEtudiants(etudiantsResponse.data);
      }
      
      if (classesResponse.status === 200) {
        setClasses(classesResponse.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [backendUrlNet]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Filter students based on search input
  const filteredEtudiants = etudiants.filter((etudiant) =>
    etudiant.user.name.toLowerCase().includes(searchEtudiant.toLowerCase()) ||
    etudiant.classe.nom.toLowerCase().includes(searchEtudiant.toLowerCase()) ||
    etudiant.user.email.toLowerCase().includes(searchEtudiant.toLowerCase())
  );

  // Toggle dropdown visibility
  const toggleDropdown = (id: number) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  // Handle adding a new student
  const handleAddEtudiant = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate input fields
    if (!nom || !classeId || !email || !password) {
      console.error("Tous les champs sont obligatoires");
      return;
    }
  
    const newEtudiant = {
      nom,
      classe_id: classeId,
      email,
      password,
      user_id:4
    };
  
    try {
      const response = await axios.post(`${backendUrlNet}/etudiants`, newEtudiant);
  
      if (response.status === 201) {
        console.log("Étudiant ajouté avec succès :", response.data);
        fetchData(); // Reload data after adding
        resetForm();
      } else {
        console.error("Erreur lors de l'ajout de l'étudiant, statut non OK :", response.status);
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'étudiant :", error);
    }
  };

  // Handle editing an existing student
  const handleEditEtudiant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEtudiant?.id) return;

    const updatedEtudiant = {
      nom,
      classe_id: classeId,
      email,
      password: password ? password : undefined // Only send password if it's changed
    };

    try {
      const response = await axios.put(`${backendUrlNet}/etudiants/${selectedEtudiant.id}`, updatedEtudiant);
      if (response.status === 200) {
        fetchData(); // Reload data to ensure we have the updated info
        resetForm();
      }
    } catch (error) {
      console.error("Error editing student:", error);
    }
  };

  // Reset form and close modals
  const resetForm = () => {
    setShowAdd(false);
    setShowEdit(false);
    setNom('');
    setClasseId('');
    setEmail('');
    setPassword('');
    setSelectedEtudiant(null);
  };

  // Handle deleting a student
  const handleDeleteEtudiant = async (id: number) => {
    try {
      const response = await axios.delete(`${backendUrlNet}/etudiants/${id}`);
      if (response.status === 200 || response.status === 204) {
        setEtudiants(prevEtudiants => prevEtudiants.filter(etudiant => etudiant.id !== id));
        // Close dropdown after delete
        setDropdownStates(prev => ({
          ...prev,
          [id]: false
        }));
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const tableHeaders = [
    { id: 'id', label: 'ID', className: '' },
    { id: 'nom', label: 'Nom', className: '' },
    { id: 'classe', label: 'Classe', className: '' },
    { id: 'email', label: 'Email', className: '' },
    { id: 'action', label: 'Action', className: '' },
  ];

  return (
    <div className="bg-white/5 p-2 sm:p-4 rounded-lg shadow-md text-white">
      <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">Étudiants</h2>

      {/* Search Input */}
      <InputSearch
        SearchData={searchEtudiant}
        onSearchChange={setSearchEtudiant}
        placeholder="Rechercher un étudiant, une classe ou un email"
      />

      <div className="mt-4 flex justify-end">
        <button
          onClick={() => setShowAdd(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Ajouter un Étudiant
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
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-700">
            {filteredEtudiants.length > 0 ? (
              filteredEtudiants.map((etudiant) => (
                <tr key={etudiant.id} className="hover:bg-blue-900/30">
                  <td className="px-1 py-1 sm:px-2 md:px-4 text-xs sm:text-sm text-gray-100">{etudiant.id}</td>
                  <td className="px-1 py-1 sm:px-2 md:px-4 text-xs sm:text-sm text-gray-100">{etudiant.user.name}</td>
                  <td className="px-1 py-1 sm:px-2 md:px-4 text-xs sm:text-sm text-gray-100">{etudiant.classe.nom}</td>
                  <td className="px-1 py-1 sm:px-2 md:px-4 text-xs sm:text-sm text-gray-100">{etudiant.user.email}</td>
                  <td className="px-2 sm:px-4 md:px-6 py-2 text-sm text-gray-100 relative">
                    <div className="relative inline-block">
                      <button
                        className="p-1 sm:p-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                        onClick={() => toggleDropdown(etudiant.id)}
                        aria-label="Menu options"
                      >
                        <FaEllipsisV className="w-4 h-4" />
                      </button>

                      {dropdownStates[etudiant.id] && (
                        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-blue-800 ring-1 ring-black ring-opacity-5 z-50">
                          <div className="flex flex-col gap-1">
                            <button
                              className="w-full text-left px-4 py-2 text-sm text-white hover:bg-blue-700 transition-colors"
                              onClick={() => {
                                // handle view details
                                toggleDropdown(etudiant.id); // Close dropdown
                              }}
                            >
                              Détails de l'Étudiant
                            </button>
                            <button
                              className="w-full text-left px-4 py-2 text-sm text-white hover:bg-blue-700 transition-colors"
                              onClick={() => {
                                setSelectedEtudiant(etudiant);
                                setNom(etudiant.user.name);
                                setClasseId(etudiant.classe.id.toString());
                                setEmail(etudiant.user.email);
                                setPassword(''); // Clear password field for security
                                setShowEdit(true);
                                toggleDropdown(etudiant.id);
                              }}
                            >
                              Modifier l'Étudiant
                            </button>
                            <button
                              className="w-full text-left px-4 py-2 text-sm text-white hover:bg-blue-700 transition-colors"
                              onClick={() => {
                                handleDeleteEtudiant(etudiant.id);
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
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-300">
                  Aucun étudiant trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Student Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-blue-800 p-4 rounded-lg shadow-md w-96 mx-auto">
            <h3 className="text-lg font-bold mb-4 text-white text-center">Ajouter un Étudiant</h3>
            <form onSubmit={handleAddEtudiant}>
              <div className="mb-4">
                <label htmlFor="nom" className="block text-sm font-medium text-white">
                  Nom de l'étudiant
                </label>
                <input
                  id="nom"
                  type="text"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  className="w-full bg-blue-700 text-white p-2 mt-1 border border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nom de l'étudiant"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="classe" className="block text-sm font-medium text-white">
                  Classe
                </label>
                <select
                  id="classe"
                  value={classeId}
                  onChange={(e) => setClasseId(e.target.value)}
                  className="w-full mt-1 block px-3 py-2 bg-blue-700 text-white border border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Sélectionner une classe</option>
                  {classes.map((classeItem) => (
                    <option key={classeItem.id} value={classeItem.id.toString()}>
                      {classeItem.nom}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-white">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-blue-700 text-white p-2 mt-1 border border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full bg-blue-700 text-white p-2 mt-1 border border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Mot de passe"
                  required
                />
              </div>

              <div className="flex justify-center gap-5">
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

      {/* Edit Student Modal */}
      {showEdit && selectedEtudiant && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-blue-800 p-4 rounded-lg shadow-md w-96 mx-auto">
            <h3 className="text-lg font-bold mb-4 text-white text-center">Modifier un Étudiant</h3>
            <form onSubmit={handleEditEtudiant}>
              <div className="mb-4">
                <label htmlFor="edit-nom" className="block text-sm font-medium text-white">
                  Nom de l'étudiant
                </label>
                <input
                  id="edit-nom"
                  type="text"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  className="w-full bg-blue-700 text-white p-2 mt-1 border border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nom de l'étudiant"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="edit-classe" className="block text-sm font-medium text-white">
                  Classe
                </label>
                <select
                  id="edit-classe"
                  value={classeId}
                  onChange={(e) => setClasseId(e.target.value)}
                  className="w-full mt-1 block px-3 py-2 bg-blue-700 text-white border border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Sélectionner une classe</option>
                  {classes.map((classeItem) => (
                    <option key={classeItem.id} value={classeItem.id.toString()}>
                      {classeItem.nom}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="edit-email" className="block text-sm font-medium text-white">
                  Email
                </label>
                <input
                  id="edit-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-blue-700 text-white p-2 mt-1 border border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Email"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="edit-password" className="block text-sm font-medium text-white">
                  Mot de passe {password ? "" : "(laisser vide pour ne pas changer)"}
                </label>
                <input
                  id="edit-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-blue-700 text-white p-2 mt-1 border border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nouveau mot de passe (optionnel)"
                />
              </div>

              <div className="flex justify-center gap-5">
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

export default EtudiantPage;