import { Header } from './components/Header';
import { UserContextProvider } from './context/UserContext';
import './styles/App.scss';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <UserContextProvider>
      <div className="App">
        <Header />
        <div className="container">
          <Outlet />
        </div>
      </div>
    </UserContextProvider>
  );
}

export default App;
