import { Route, Routes } from 'react-router-dom';
import MyBooks from './pages/MyBooks';
import NavBar from './components/NavBar';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {

  return (
    <div>
      <NavBar />
        <Routes>
          <Route path='/' element={<MyBooks />} />
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} />
    </div>
  );
}

export default App;
