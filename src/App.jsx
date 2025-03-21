
import './App.css'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import About from './Pages/About'
import Projects from './Pages/Projects'
import Contact from './Pages/Contact'
import Scrollbar from './Components/Scrollbar';
import ParticalBackground from './Components/ParticalBackground'

function App() {
  return (
    <div className='w-screen flex flex-col items-center px-5 max-sm:px-2 text-white'>
      <ParticalBackground/>
      <Navbar/>
      <Home/>
      <About/>
      <Projects/>
      <Contact/>
      <Scrollbar color='rgb(255,255,255,.7)'/>
    </div>
  )
}

export default App
