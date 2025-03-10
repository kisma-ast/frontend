import { useAuth } from '../../../contexts/AuthContext';
import axios from 'axios';
import { BellIcon } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {

  return (
    <header className="bg-blue-800 shadow py-4" >
          <div className="container mx-auto  p-3 sm:p-4 py-3 flex justify-end items-end">
          
            
          </div>
        </header>
  );
};

export default Header;