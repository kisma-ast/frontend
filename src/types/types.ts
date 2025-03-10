
export interface Cours {

  id: number;
  nom: string;
  professeur_id: string;
  professeur:Professeur
  
 
}

export interface Classe {

  id: number;
  niveau: string;
  nom: string;

  
 
}
 export interface User{
  
        id: 1,
        name: string,
        email:string
       
 }
export interface EmploiTemps  {
  id: number;
  cours_id: string;
  classe_id: string;
  heure_debut: string;
  heure_fin: string;
  professeur_id: string;
  salle: string;
  jour_semaine: string;
  cours:Cours
  professeur:Professeur
  classe:Classe




  
};
export interface Professeur {
  id: number;
  email:string
  password:string
  nom: string;
  user:User
 
}
export interface Etudiant {
  id: number;
  email:string
  password:string
  nom: string;
  classe_is:string,
  classe:Classe
  user:User
}

