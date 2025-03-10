import { FaEllipsisV } from 'react-icons/fa';
import InputSearch from '../../components/common/InputSearch';
import React, { useState, useEffect, useCallback } from 'react';
import { Classe, Cours, EmploiTemps, Professeur } from '../../types/types';
import axios from 'axios';



function EmploiTempsPage() {
  const [emploiTemps, setEmploiTemps] = useState<EmploiTemps[]>([]); // State for storing emploiTemps data
  const [classes, setClasses] = useState<Classe[]>([]);
  const [cours, setCours] = useState<Cours[]>([]);
  const [profs, setProfs] = useState<Professeur[]>([]);

  const [searchEmploiTemps, setSearchEmploiTemps] = useState<string>(''); // State for search text
  const [dropdownStates, setDropdownStates] = useState<{ [key: number]: boolean }>({}); // State for dropdowns
  const [showAdd, setShowAdd] = useState(false); // Control Add form visibility
  const [showEdit, setShowEdit] = useState(false); // Control Edit form visibility
  const [selectedEmploiTemps, setSelectedEmploiTemps] = useState<EmploiTemps | null>(null); // State for selected EmploiTemps
  const [nom, setNom] = useState('');
  const [classeId, setClasseId] = useState('');
  const [heureDebut, setHeureDebut] = useState('');
  const [heureFin, setHeureFin] = useState('');
  const [professeurId, setProfesseurId] = useState('');
  const [salle, setSalle] = useState('');
  const [courId, setCourId] = useState('');
  const [jour, setJour] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  const backendUrlNet ='http://127.0.0.1:8000/api'
  // Simulating course data fetching (normally, you would fetch this from an API)

  const fetchEmploisTemps = useCallback(async () => {
    try {
      const response = await axios.get(`${backendUrlNet}/emplois_du_temps`);
      if (response.status === 200) {
        setEmploiTemps(response.data);
      }
    } catch (error) {
      console.error("Error fetching cours:", error);
    }
  }, [backendUrlNet]);
  useEffect(() => {
    fetchEmploisTemps();
  }, []);



  const toggleDropdown = (id: number) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const fetchProfs = useCallback(async () => {
    try {
      const professeur = await axios.get(`${backendUrlNet}/professeurs`);
      const cours = await axios.get(`${backendUrlNet}/cours`);
      const classe = await axios.get(`${backendUrlNet}/classes`);
      if (professeur.status === 200 && cours.status === 200 && classe.status === 200) {
        setProfs(professeur.data);
        setClasses(classe.data);
        setCours(cours.data);
      }
    } catch (error) {
      console.error('Error fetching Professeurs, Cours, or Classes:', error);
    }
  }, [backendUrlNet]);

  useEffect(() => {
    fetchProfs();
  }, [fetchProfs]);

    const handleAddEmploiTemps = async () => {
      const newEmploiTemps = {
        cours_id: courId,
        classe_id:classeId,
        heure_debut: heureDebut,
        heure_fin:heureFin,
        professeur_id:professeurId,
        salle,
        jour_semaine:jour,
      };

      try {
        const response = await axios.post(`${backendUrlNet}/emplois_du_temps`, newEmploiTemps);
        if (response.status === 201) {
          fetchEmploisTemps();
          resetForm();
          setShowAdd(false);
        }
      } catch (error) {
        console.error('Error adding emploiTemps:', error);
      }
    };

  const handleEditEmploiTemps = async () => {
    if (!selectedEmploiTemps?.id) return;
    const updatedEmploiTemps = {
      cours_id: courId,
      classe_id:classeId,
      heure_debut: heureDebut,
      heure_fin:heureFin,
      professeur_id:professeurId,
      salle,
      jour_semaine:jour,
    };
console.log(updatedEmploiTemps)
    try {
      const response = await axios.put(`${backendUrlNet}/emplois_du_temps/${selectedEmploiTemps.id}`, updatedEmploiTemps);
      console.log(response)
      if (response.status === 200) {
        const updatedList = emploiTemps.map((e) =>
          e.id === selectedEmploiTemps.id ? { ...e, ...updatedEmploiTemps } : e
        );
        setEmploiTemps(updatedList);
        setShowEdit(false);
        
        setSelectedEmploiTemps(null);
      }
    } catch (error) {
      console.error('Error editing emploiTemps:', error);
    }
  };

  const handleDeleteEmploiTemps = async (id: number) => {
    try {
      const response = await axios.delete(`${backendUrlNet}/emplois_du_temps/${id}`);
      if (response.status === 200) {
        setEmploiTemps(emploiTemps.filter((emploiTempsItem) => emploiTempsItem.id !== id));
        setDropdownStates((prevState) => {
          const updatedState = { ...prevState };
          delete updatedState[id];
          return updatedState;
        });
      }
    } catch (error) {
      console.error('Error deleting emploiTemps:', error);
    }
  };

  const handleSelectEmploiTemps = (emploiTempsItem: EmploiTemps) => {
   console.log(emploiTemps)
    setSelectedEmploiTemps(emploiTempsItem);
    setCourId(emploiTempsItem.cours_id);
    setClasseId(emploiTempsItem.classe_id);
    setHeureDebut(emploiTempsItem.heure_debut);
    setHeureFin(emploiTempsItem.heure_fin);
    setProfesseurId(emploiTempsItem.professeur_id);
    setSalle(emploiTempsItem.salle);
    setJour(emploiTempsItem.jour_semaine);
    setIsEdit(true);
    setShowEdit(true);
  };
  const resetForm = () => {
    setShowAdd(false);
    setShowEdit(false);
    setNom('');
    setProfesseurId('');
    setClasseId('');
    setCourId('');
    // selectedEmploiTemps(null);
  };

  const tableHeaders = [
    { id: 'id', label: 'ID' },
    { id: 'cours', label: 'Cours' },
    { id: 'classe', label: 'Classe' },
    { id: 'professeur', label: 'Professeur' },
    { id: 'jour', label: 'Jour' },
    { id: 'salle', label: 'Salle' },
    { id: 'heureDebut', label: 'Heure de Début' },
    { id: 'heureFin', label: 'Heure de Fin' },
  ];

  return (
    <div className="bg-white/5 p-4 rounded-lg shadow-md text-white">
      <h2 className="text-lg sm:text-xl font-bold mb-4">Emploi du Temps</h2>

      {/* Search Input */}
      <InputSearch
        SearchData={searchEmploiTemps}
        onSearchChange={setSearchEmploiTemps}
        placeholder="Entrer le nom du cours"
      />

      <div className="mt-4 flex justify-end">
        <button
          onClick={() => setShowAdd(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Ajouter un Emploi du Temps
        </button>
      </div>

      <div className="mt-4">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-blue-800">
              {tableHeaders.map((header) => (
                <th
                  key={header.id}
                  className="px-1 py-1 sm:px-2 md:px-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider whitespace-nowrap"
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
            {emploiTemps.map((emploiTempsItem) => (
              <tr key={emploiTempsItem.id}>
                <td className="px-1 py-1 sm:px-2 md:px-4 text-xs sm:text-sm text-gray-100">
                  {emploiTempsItem.id}
                </td>
                <td className="px-1 py-1 sm:px-2 md:px-4 text-xs sm:text-sm text-gray-100">
                  {emploiTempsItem.cours?.nom}
                </td>
                <td className="px-1 py-1 sm:px-2 md:px-4 text-xs sm:text-sm text-gray-100">
                  {emploiTempsItem.classe?.nom}
                </td>
                <td className="px-1 py-1 sm:px-2 md:px-4 text-xs sm:text-sm text-gray-100">
                  {emploiTempsItem.professeur.user.name}
                </td>
                
                <td className="px-1 py-1 sm:px-2 md:px-4 text-xs sm:text-sm text-gray-100">
  {new Date(emploiTempsItem.jour_semaine).toLocaleDateString('fr-CA')}
</td>

                <td className="px-1 py-1 sm:px-2 md:px-4 text-xs sm:text-sm text-gray-100">
                  {emploiTempsItem.salle}
                </td>
                <td className="px-1 py-1 sm:px-2 md:px-4 text-xs sm:text-sm text-gray-100">
                  {emploiTempsItem.heure_debut}
                </td>
                <td className="px-1 py-1 sm:px-2 md:px-4 text-xs sm:text-sm text-gray-100">
                  {emploiTempsItem.heure_fin}
                </td>
                <td className="px-2 sm:px-4 md:px-6 py-2 text-sm text-gray-100 relative">
                  <div className="relative inline-block">
                    <button
                      onClick={() => toggleDropdown(emploiTempsItem.id)}
                      className="p-1 sm:p-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                    >
                      <FaEllipsisV />
                    </button>
                    {dropdownStates[emploiTempsItem.id] && (
                      <div className="absolute right-0 w-32 mt-2 bg-blue-700 rounded-md shadow-lg z-10">
                        <ul className="text-white text-sm">
                          <li>
                            <button
                              onClick={() => handleSelectEmploiTemps(emploiTempsItem)}
                              className="block px-4 py-2 hover:bg-blue-800 w-full text-left"
                            >
                              Modifier
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => handleDeleteEmploiTemps(emploiTempsItem.id)}
                              className="block px-4 py-2 hover:bg-blue-800 w-full text-left"
                            >
                              Supprimer
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Form Modal */}
      {showAdd || showEdit ? (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-blue-800 p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">{isEdit ? 'Modifier' : 'Ajouter'} un Emploi du Temps</h3>
            <form>
              {/* Form Fields */}
              <div className="mb-4">
                <label htmlFor="cours" className="block text-sm font-medium text-white">Cours</label>
                <select
                  id="cours"
                  value={courId}
                  onChange={(e) => setCourId(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border  bg-blue-700 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option>selectionner</option>
                  {cours.map((classeItem) => (
                    <option key={classeItem.id} value={classeItem.id}>
                      {classeItem.nom}
                    </option>
                  ))}
                </select>
                
              </div>

              <div className="mb-4">
                <label htmlFor="classe" className="block text-sm font-medium text-white">Classe</label>
                <select
                  id="classe"
                  value={classeId}
                  onChange={(e) => setClasseId(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border  bg-blue-700 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                    <option value="">Sélectionner</option>

                  {classes.map((classeItem) => (
                    <option key={classeItem.id} value={classeItem.id}>
                      {classeItem.nom}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="professeur" className="block text-sm font-medium text-white">
                  Professeur
                </label>
                <select
                    id="professeur"
                    value={professeurId}
                    onChange={(e) => setProfesseurId(e.target.value)}
                    className="w-full p-2 mt-1 rounded border  bg-blue-700 bg-blue-700 text-white"
                  >
                    <option value="">Sélectionner</option>
                    {profs.map((professeur) => (
                      <option key={professeur.id} value={professeur.id}>
                        {professeur.user.name}
                      </option>
                    ))}
                  </select>
              </div>
              <div className="mb-4">
                <label htmlFor="heureDebut" className="block text-sm font-medium text-white">
                  Heure de Début
                </label>
                <input
                  id="heureDebut"
                  type="time"
                  value={heureDebut}
                  onChange={(e) => setHeureDebut(e.target.value)}
                  className="w-full p-2 mt-1 border  bg-blue-700 rounded-lg"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="heureFin" className="block text-sm font-medium text-white">
                  Heure de Fin
                </label>
                <input
                  id="heureFin"
                  type="time"
                  value={heureFin}
                  onChange={(e) => setHeureFin(e.target.value)}
                  className="w-full p-2 mt-1 border  bg-blue-700 rounded-lg"
                  required
                />
              </div>

              

              <div className="mb-4">
                <label htmlFor="salle" className="block text-sm font-medium text-white">
                  Salle
                </label>
                <input
                  id="salle"
                  type="text"
                  value={salle}
                  onChange={(e) => setSalle(e.target.value)}
                  className="w-full p-2 mt-1 border  bg-blue-700 rounded-lg"
                  placeholder="Salle"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="jour" className="block text-sm font-medium text-white">
                  Jour
                </label>
                <input
                  id="jour"
                  type="date"
                  value={jour}
                  onChange={(e) => setJour(e.target.value)}
                  className="w-full p-2 mt-1 border  bg-blue-700 rounded-lg"
                  placeholder="Jour"
                  required
                />
              </div>
              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={isEdit ? handleEditEmploiTemps : handleAddEmploiTemps}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  {isEdit ? 'Mettre à jour' : 'Ajouter'}
                </button>
                <button
                  type="button"
                  onClick={() => {resetForm();  }}
                  className="ml-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default EmploiTempsPage;
