import React, { createContext, useContext, useEffect, useState } from 'react';
import { getUser } from '../api/user';
import { useNavigate } from 'react-router-dom';
import { User } from '../types/User';

type UserContextType = {
  user: User | null;
  login: () => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserContextProvider');
  }
  return context;
};

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  console.log(user, 'settled')

  
  const navigate = useNavigate();
  
  const USERNAME = 'Delphine';
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      navigate('/feed', { replace: true });
    }
  }, []); 

  const login = () => {
    getUser(USERNAME)
      .then(Response => {
        const userData: User = Response.data[0];

        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData))
        navigate('/feed', { replace: true });
      } )
      .catch(Error => console.log(Error));
  };
    
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/', { replace: true }); 
  };

  const value = {
    user, 
    login, 
    logout,
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
