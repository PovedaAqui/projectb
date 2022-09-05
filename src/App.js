import { Route, Routes } from 'react-router-dom';
import MyBooks from './pages/MyBooks';
import NavBar from './components/NavBar';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Store from './pages/Store';
import DataFeed from './utils/DataFeed';

function App() {

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<MyBooks />} />
        <Route path='/store' element={<Store />} />
        <Route path='/price' element={<DataFeed />} />
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  );
}

export default App;
