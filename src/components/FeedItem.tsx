import { Feed } from '../types/Feed';
import { motion } from 'framer-motion';

import edit from '../img/edit-feed.png';
import remove from '../img/delete-feed-icon.png';

import '../styles/FeedItem.scss';

type Props = {
  feed: Feed;
};

export const FeedItem: React.FC<Props> = ({ feed }) => {
  return (
    <div className="feed" key={feed.id}>
      <div className="feed__data">
        <div className="feed__title">{feed.title}</div>
        <div className="feed__body">{feed.body}</div>
      </div>

      <div className="feed__actions">
        <motion.button
          className="feed__label"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <img src={edit} alt="edit feed" className="feed__icon" />
        </motion.button>
        <motion.button
          className="feed__label"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <img src={remove} alt="remove feed" className="feed__icon" />
        </motion.button>
      </div>
    </div>
  );
};
