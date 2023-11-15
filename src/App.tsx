import { Header } from './components/Header';
import { FeedContextProvider } from './context/FeedContext';
import { UserContextProvider } from './context/UserContext';
import './styles/App.scss';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <UserContextProvider>
      <FeedContextProvider>
      <div className="App">
        <Header />
        <div className="container">
          <Outlet />
        </div>
      </div>
      </FeedContextProvider>
    </UserContextProvider>
  );
}

export default App;
