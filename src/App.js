import { Route, Routes } from 'react-router-dom';
import MyBooks from './pages/MyBooks';
import NavBar from './components/NavBar';

function App() {

  return (
    <div>
      <NavBar />
        <Routes>
          <Route path='/' element={<MyBooks />} />
        </Routes>
    </div>
  );
}

export default App;
