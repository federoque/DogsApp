import './styles/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './components/LandingPage.jsx'
import Home from './components/Home';
import CardDetail from './components/CardDetail';
import DogCreate from './components/DogCreate'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<LandingPage />} />
        <Route path='/home' element={<Home />} />
        <Route path='/dogs/:id' element={<CardDetail />} />
        <Route path='/dog' element={<DogCreate/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;