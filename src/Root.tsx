import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import { NotFoundPage } from './pages/NotFoundPage';
import { LoginPage } from './pages/LoginPage';
import { FeedPage } from './pages/FeedPage';

export const Root = () => {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<LoginPage />} />
          <Route  path="feed" element={<FeedPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="login" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};
