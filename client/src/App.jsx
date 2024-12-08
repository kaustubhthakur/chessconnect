import React from 'react'
import {Route,Routes} from "react-router-dom"
import HomePage from './pages/homepage/HomePage'
import LoginPage from './pages/loginpage/LoginPage'
import RegisterPage from './pages/registerpage/RegisterPage'
import Profile from './components/profile/Profile'
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>}  />
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
      <Route path='/profile' element={<Profile/>} />
      <Route/>
      <Route/>
      <Route/>
    </Routes>
  )
}

export default App