
import './App.css'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import About from './Pages/About'
import Projects from './Pages/Projects'
import Contact from './Pages/Contact'
import Scrollbar from './Components/Scrollbar'

function App() {
  return (
    <div className='w-screen flex flex-col items-center px-5 bg-pink-100'>
      <Navbar/>
      <Home/>
      <About/>
      <Projects/>
      <Contact/>
      <Scrollbar/>
    </div>
  )
}

export default App
