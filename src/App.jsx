import React from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
// Import Navigate here
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

const routes = (
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      
      <Route path='/dashboard' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
    </Routes>
  </Router>
)

const App = () => {
  return (
    <div>
      {routes}
    </div>
  )
}

export default App