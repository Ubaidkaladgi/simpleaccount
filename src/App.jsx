import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Login from './login/Login'
import Dashboard from './Dashboard/Dashboard'
import { ConfigProvider, theme, Button, Card } from "antd";

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
    <ConfigProvider>
     <header className='App-header'>
      <Router>
        <Routes>
          <Route path ="/login" element={<Login/>}></Route>
          <Route path='/home' element={<Dashboard /> }></Route>
        </Routes>
      </Router>
      </header>
      </ConfigProvider>
    </>
  )
}

export default App
