import { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';

import close from '../img/close-icon.png'

import '../styles/FeedModalForm.scss';
import { useUserContext } from '../context/UserContext';
import { useFeedContext } from '../context/FeedContext';

type Props = {
  onClose: () => void;
}

type FeedData = {
  title: string;
  body: string;
};

export const FeedModalForm: React.FC<Props> = ({ onClose }) => {
  const { addFeed } = useFeedContext();
  const { user } = useUserContext();

  const [feedData, setFeedData] = useState<FeedData>({
    title: '',
    body: '',
  });

  const [errors, setErrors] = useState({
    title: false,
    body: false,
  });

  const validateField = (field: keyof FeedData) => {
    const newErrors = { ...errors }

    if (feedData[field].trim() === '') {
      newErrors[field] = true;
    }

    setErrors(newErrors)
  }

  const handleFocus = (field: keyof FeedData) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }))
  }

  const handleBlur = (field: keyof FeedData) => {
    validateField(field)
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target

    setFeedData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    for (const error of Object.values(errors)) {
      if (error) {
        return;
      }
    }

    if (user) {
      const newFeed = {
        userId: user?.id,
        id: Date.now(),
        title: feedData.title,
        body: feedData.body,
      }
  
      addFeed(newFeed);
  
      onClose();
  
      setFeedData({
        title: '',
        body: '',
      })
    }
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <motion.button
          className="close"
          onClick={onClose}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <img className="close-icon" src={close} alt="close" />
        </motion.button>

        <form onSubmit={handleSubmit} className="form create-article">
          <h2 className="form__title">Create feed</h2>
          <div className="form__div">
            <input
              className="form__input"
              type="text"
              name="title"
              value={feedData.title}
              onChange={handleChange}
              onFocus={() => handleFocus('title')}
              onBlur={() => handleBlur('title')}
              placeholder=" "
            />
            <label className="form__label">Title:</label>
            <div className="form__error">{errors.title}</div>
          </div>

          <div className="form__div">
            <textarea
              className="form__input"
              name="body"
              value={feedData.body}
              onChange={handleChange}
              onFocus={() => handleFocus('body')}
              onBlur={() => handleBlur('body')}
              placeholder=" "
            />
            <label className="form__label">Body:</label>
            <div className="form__error">{errors.body}</div>
          </div>

          <motion.button
            className="form__button"
            type="submit"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            Add Feed
          </motion.button>
        </form>
      </div>
    </div>
  );
} 