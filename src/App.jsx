import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Error from './pages/Error';
import Home from './pages/Home';
import Login from './pages/Login';
import ProtectedRoutes from './utils/ProtectedRoutes';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={ <ProtectedRoutes /> }>
          <Route path="/" element={ <Home /> } />
        </Route>
        <Route path="/login" element={ <Login /> } />
        <Route path='*' element={ <Error /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
