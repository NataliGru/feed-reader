import React from 'react';
import { motion } from 'framer-motion';

import { useUserContext } from '../context/UserContext';

import '../styles/Header.scss';
import userIcon from '../img/user-icon.png';
import logIcon from '../img/log-icon.png';

export const Header: React.FC = () => {
  const { user, logout } = useUserContext();

  return (
    <div className="header">
      {user && (
        <div className="header__log-buttons">
        <div className="account__info">
          <p className="account__full-name">{user?.name}</p>
          <button className="log account">
            <img
              src={userIcon}
              alt="accountIcon"
              className="log account__icon"
            />
          </button>
        </div>

        <motion.button
          className="log log-status"
          onClick={logout}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          disabled={user === null}
        >
          <img src={logIcon} alt="log-status" className="log log-out" />
        </motion.button>
      </div>
      )}
    </div>
  );
};
