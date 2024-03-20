import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Error from './pages/Error';
import Home from './pages/Home';
import Login from './pages/Login';
import ProtectedRoutes from './utils/ProtectedRoutes';
import { CustomProvider } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

function App() {

  return (
    <CustomProvider theme="dark">
      <BrowserRouter>
        <Routes>
          <Route element={ <ProtectedRoutes /> }>
            <Route path="/" element={ <Home /> } />
          </Route>
          <Route path="/login" element={ <Login /> } />
          <Route path='*' element={ <Error /> } />
        </Routes>
      </BrowserRouter>
    </CustomProvider>
  )
}

export default App
