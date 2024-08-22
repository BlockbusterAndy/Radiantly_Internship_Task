import Navbar from './components/Navbar'
import PokemonList from './components/PokemonList'
import PokemonDetails from './components/PokemonDetails'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {

  return (
    <>
    <Router>
      <Navbar />
      <main className='bg-slate-900 min-h-screen'>
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/pokemon/:id" element={<PokemonDetails />} />
        </Routes>
      </main>
    </Router>
    
    </>
  )
}

export default App
