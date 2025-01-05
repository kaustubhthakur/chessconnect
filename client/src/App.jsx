import React from 'react'
import {Route,Routes} from "react-router-dom"
import HomePage from './pages/homepage/HomePage'
import RegisterPage from './pages/registerpage/RegisterPage'
import LoginPage from './pages/loginpage/LoginPage'
import CreatePost from './components/createpost/CreatePost'
import ProfilePage from './components/profile/ProfilePage'
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/register' element={<RegisterPage/>} />
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/createpost' element={<CreatePost/>} />
      <Route path='/profile' element={<ProfilePage/>} />
    </Routes>
  )
}


export default App