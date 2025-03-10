import axios from 'axios';
import FormSwap from '../../components/common/FormSwap';
import InputSearch from '../../components/common/InputSearch';
import Tables from '../../components/common/Tables';
import { Cours, Professeur } from '../../types/types';
import React, { useState, useEffect, useCallback } from 'react';

function CoursPage() {
  const [cours, setCours] = useState<Cours[]>([]); // State for storing course data
  const [searchCours, setSearchCours] = useState<string>(""); // State for search text
  const [dropdownStates, setDropdownStates] = useState<{ [key: number]: boolean }>({}); // State for dropdowns
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [selectedSwaps, setSelectedSwaps] = useState<Cours | null>(null);
  const [nom, setNom] = useState<string>(''); // State for course name
  const [professeurId, setProfesseurId] = useState<string>(''); // State for professor ID
  const [profs, setProfs] = useState<Professeur[]>([]); // State for professors data
  const backendUrlNet = 'http://127.0.0.1:8000/api';

  // Fetch courses and professors from API
  const fetchCours = useCallback(async () => {
    try {
      const response = await axios.get(`${backendUrlNet}/cours`);
      if (response.status === 200) {
        setCours(response.data);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  }, []);

  const fetchProfessors = useCallback(async () => {
    try {
      const response = await axios.get(`${backendUrlNet}/professeurs`);
      if (response.status === 200) {
        setProfs(response.data);
      }
    } catch (error) {
      console.error("Error fetching professors:", error);
    }
  }, []);

  useEffect(() => {
    fetchCours();
    fetchProfessors();
  }, [fetchCours, fetchProfessors]);

  // Toggle dropdown visibility
  const toggleDropdown = (id: number) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  const handleAddCdourse = async () => {
    // Vérifiez si 'nom' et 'professeurId' sont valides avant de soumettre
    if (!nom || !professeurId) {
      console.error("Le nom du cours ou le professeur n'est pas défini.");
      return;
    }
  
    const newCours = {
      nom,
      professeur_id: professeurId,
    };
  
    try {
      const response = await axios.post(`${backendUrlNet}/cours`, newCours);
  
      // Vérifiez la réponse et actualisez la liste des cours si le statut est OK
      if (response.status === 201) {
        console.log("Cours ajouté avec succès :", response.data);
        fetchCours(); // Recharge les cours après l'ajout
        setShowAdd(false); // Cache le formulaire d'ajout
        setNom(''); // Réinitialise le champ "nom"
        setProfesseurId(''); // Réinitialise le champ "professeurId"
      } else {
        console.error("Erreur lors de l'ajout du cours, statut non OK :", response.status);
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du cours :", error);
    }
  };
  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nom || !professeurId) {
      console.error("Le nom du cours ou le professeur n'est pas défini.");
      return;
    }
  
    const newCours = {
      nom,
      professeur_id: professeurId,
    };
  
    try {
      const response = await axios.post(`${backendUrlNet}/cours`, newCours);
  
      if (response.status === 201) {
        console.log("Classe ajoutée avec succès :", response.data);
        fetchCours(); 
       
        resetForm();
      } else {
        console.error("Erreur lors de l'ajout de la classe, statut non OK :", response.status);
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de la classe :", error);
    }
  };
  const resetForm = () => {
    setShowAdd(false);
    setShowEdit(false);
    setNom('');
    setProfesseurId('');
    setSelectedSwaps(null);
  };
 

  const handleEditCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSwaps?.id) return;

    const updatedCours = {
      nom,
      professeur_id: professeurId,
    };

    try {
      const response = await axios.put(`${backendUrlNet}/cours/${selectedSwaps.id}`, updatedCours);
      if (response.status === 200) {
        setCours((prevClasses) =>
          prevClasses.map((classe) =>
            classe.id === selectedSwaps.id ? { ...classe, ...updatedCours } : classe
          )
        );
        resetForm();
      }
    } catch (error) {
      console.error("Error editing class:", error);
    }
  };
 
  const handleDeleteCourse = async (id: number) => {
    try {
      const response = await axios.delete(`${backendUrlNet}/cours/${id}`);
      if (response.status === 200 || response.status === 204) {
        setCours(prevClasses => prevClasses.filter(classe => classe.id !== id));
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
  // Set selected course for editing
  const handleEditButtonClick = (course: Cours) => {
    setSelectedSwaps(course);
    setNom(course.nom); // Pre-fill form with current course data
    setProfesseurId(course.professeur_id); // Pre-fill professor data
    setShowEdit(true); // Show the edit form
  };

  return (
    <div className="bg-white/5 p-2 sm:p-4 rounded-lg shadow-md text-white">
      <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">Cours</h2>

      <InputSearch
        SearchData={searchCours}
        onSearchChange={setSearchCours}
        placeholder="Entrer le nom du cours"
      />

      <div className="mt-4 flex justify-end">
        <button
          onClick={() => setShowAdd(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Ajouter un Cours
        </button>
      </div>

      <div className="mt-4">
        <Tables
          cours={cours}
          dropdownStates={dropdownStates}
          toggleDropdown={toggleDropdown}
          onEdit={handleEditButtonClick}
          onDelete={handleDeleteCourse}
        />
      </div>

      {showAdd && (
        <FormSwap
          nom={nom}
          professeurId={professeurId}
          profs={profs}
          setNom={setNom}
          setProfesseurId={setProfesseurId}
          handleSubmit={handleAddCourse}
          onCancel={() => setShowAdd(false)}
          isEdit={false} // C'est un formulaire "Ajouter"
        />
      )}

      {showEdit && selectedSwaps && (
        <FormSwap
          cours={selectedSwaps}
          nom={nom}
          professeurId={professeurId}
          profs={profs}
          setNom={setNom}
          setProfesseurId={setProfesseurId}
          handleSubmit={handleEditCourse}
          onCancel={() => setShowEdit(false)}
          isEdit={true} // C'est un formulaire "Modifier"
        />
      )}
    </div>
  );
}

export default CoursPage;
