import { Link, useNavigate } from "react-router-dom"
import "./RegisterPage.css"
import { useState } from "react"
import axios from 'axios'
const RegisterPage = () => {
    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [error,setError]=useState(false)
    const navigate=useNavigate()
    const handleRegister=async ()=>{
    
        try{
          const res=await axios.post("http://localhost:9000/auth/register",{username,email,password})
          setUsername(res.data.username)
          setEmail(res.data.email)
          setPassword(res.data.password)
          setError(false)
          navigate("/login")
          alert("registered!!!!!!!")
          
        }
        catch(err){
          setError(true)
          console.log(err)
        }
    
      }
    
  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4">

  
    </div>
    <div className="w-full flex justify-center items-center h-[80vh] ">
       <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">

         <input onChange={(e)=>setUsername(e.target.value)} className="w-full px-4 py-2 border-2 border-black outline-0" type="text" placeholder="Enter your username" />
         <input onChange={(e)=>setEmail(e.target.value)} className="w-full px-4 py-2 border-2 border-black outline-0" type="text" placeholder="Enter your email" />
         <input onChange={(e)=>setPassword(e.target.value)} className="w-full px-4 py-2 border-2 border-black outline-0" type="password" placeholder="Enter your password" />
         <button onClick={handleRegister} className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black ">Register</button>
         {error && <h3 className="text-red-500 text-sm ">Something went wrong</h3>}
         <div className="flex justify-center items-center space-x-3">
          <p>Already have an account?</p>
          <p className="text-gray-500 hover:text-black"><Link to="/login">Login</Link></p>
         </div>
       </div>
    </div>

    </>
  )
}

export default RegisterPage