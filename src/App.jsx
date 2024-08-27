import { useState } from 'react'
import './App.css'


import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Login from './login/Login'
import Dashboard from './Dashboard/Dashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <header className='App-header'>
      <Router>
        <Routes>
          <Route path ="/login" element={<Login/>}></Route>
          <Route path='/home' element={<Dashboard /> }></Route>
        </Routes>
      </Router>
      </header>
      
    </>
  )
}

export default App
