import React, { createContext, useContext, useState } from 'react';
import { getUser } from '../api/user';
import { useNavigate } from 'react-router-dom';

type User = {
  id: number;
  username: string;
  password: string;
};

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

console.log(user)

  const navigate = useNavigate();

  const USERNAME = 'Delphine';

  const login = () => {
    getUser(USERNAME)
      .then(Response => {
        const userData = Response.data;

        setUser(userData);
      navigate('/feed', { replace: true })

      } )
      .catch(Error => console.log(Error));
  };

  const logout = () => {
    setUser(null);
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
