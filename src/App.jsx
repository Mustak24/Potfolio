
import './App.css'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import About from './Pages/About'
import Projects from './Pages/Projects'
import Contact from './Pages/Contact'
import Scrollbar from './Components/Scrollbar';
import ParticalBackground from './Components/ParticalBackground'
import Cursor from './Components/Cursor'

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
        <Cursor className={'rounded-full backdrop-blur-[4px] bg-[rgb(0,0,0,.4)] p-5 aspect-square text-xl'} text='cursor' />
      </div>
  )
}

export default App
