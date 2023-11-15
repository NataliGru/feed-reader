import { useState } from 'react';
import { motion } from 'framer-motion';

import { FeedList } from '../components/FeedList';
import { FeedModalForm } from '../components/FeedModalForm';

import '../styles/FeedPage.scss';

import createFeed from '../img/create-feed-icon.png';

export const FeedPage: React.FC = () => {
  const [showFeedModal, setShowFeedModal] = useState(false);

  const handleOpenModal = () => {
    setShowFeedModal(true);
  };

  const handleCloseModal = () => {
    setShowFeedModal(false);
  };

  return (
    <div className="feed-page">
      <motion.button
        className="feed__open"
        onClick={handleOpenModal}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        <img src={createFeed} alt="create feed" className="feed__create" />
      </motion.button>

      {showFeedModal && <FeedModalForm onClose={handleCloseModal} />}
      <FeedList />
    </div>
  );
};
