import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Repeat, 
  AlertCircle, 
  Receipt, 
  Users, 
  Shield, 
  UserCog 
} from 'lucide-react';
import logo from "../../../assets/Final Logo/Logo File/Favicon-Icon.png";
import { useAuth } from '../../../contexts/AuthContext';
import { FaGoodreads } from 'react-icons/fa';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarAdmin: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  
  const [role, setRole] = useState<string>("");
  const { user } = useAuth();

  // Utilisez useEffect pour définir le rôle une seule fois lors du changement d'utilisateur
  useEffect(() => {
    if (user && user.role?.caption) {
      setRole(user.role.caption);
    }
  }, [user]);

  const menuItemsAdmin = [
    { to: '/', label: 'Tableau de Bord', icon: LayoutDashboard },
    { to: '/cours', label: 'Cours', icon: LayoutDashboard },
    { to: '/classes', label: 'Classes', icon: FaGoodreads },
    { to: '/emploiTemps', label: 'Emplois du Temps', icon: Repeat },
    { to: '/professeurs', label: 'professeurs', icon: AlertCircle },
    { to: '/etudiants', label: 'Etudiants', icon: Receipt },
   
  ];

 

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-blue-800 rounded-full"
      >
        <div className="space-y-1">
          <span className="block w-6 h-0.5 bg-white"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
        </div>
      </button>

      <aside
        className={`
          fixed top-0 left-0 bg-blue-800 text-white 
          transition-all duration-300 ease-in-out h-screen
          ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64'}
          md:translate-x-0 md:relative md:block md:w-64 z-40
        `}
      >
        <div className="p-4">
          

          <nav className='mt-9'>
            <ul className="space-y-1">
              {/* Check role and render corresponding menu items */}
              {menuItemsAdmin.map(({ to, label, icon: Icon }) => (
                    <div key={to}>
                      <li>
                        <NavLink
                          to={to}
                          className={({ isActive }) => `
                            flex items-center gap-3 px-4 py-3 rounded transition-colors
                            ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-blue-700'}
                          `}
                        >
                          <Icon size={20} />
                          <span>{label}</span>
                        </NavLink>
                      </li>
                      <hr className="border-blue-700 my-1" />
                    </div>
                  ))
                }
              
            </ul>
          </nav>
        </div>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default SidebarAdmin;
