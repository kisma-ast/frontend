import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomeAdmin from "./module/admin/Home.tsx";
import CoursPage from "./module/admin/Cours.tsx";
import Layout from "./components/common/layouts/Layouts.tsx";
import ClassePage from "./module/admin/Classes.tsx";
import EmploiTempsPage from "./module/admin/EmploiTemps.tsx";
import ProfesseurPage from "./module/admin/Professeur.tsx";
import EtudiantPage from "./module/admin/Etudiants.tsx";
import LoginPage from "./module/login.tsx";


const App: React.FC = () => {
  

  return (
    // <AuthProvider>
        <Router>
          

            <Routes>

              <Route path="/" element={<Layout />}>
                <Route path="/" element={<HomeAdmin />} />
                <Route path="/cours" element={<CoursPage />} />
                <Route path="/classes" element={<ClassePage />} />
                <Route path="/emploiTemps" element={<EmploiTempsPage />} />
                <Route path="/professeurs" element={<ProfesseurPage />} />
                <Route path="/etudiants" element={<EtudiantPage />} />
                
              </Route>

              <Route path="/login" element={<LoginPage />} />
              

              
            </Routes>
        </Router>
    // </AuthProvider>
  );
};

export default App;
