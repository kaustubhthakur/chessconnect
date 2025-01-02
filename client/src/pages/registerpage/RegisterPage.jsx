import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    fetch("http://localhost:9000/auth/register", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: pwd
      })
    }).then((res) => res.json()).then((data) => {
      if (data.success) {
        navigate("/login");
      } else {
        setError(data.msg);
      }
    });
  };

  return (
    <>
      <div className="con flex flex-col items-center justify-center h-screen bg-[#070707]">
        <form onSubmit={submitForm} className='w-[26vw] min-h-[auto] bg-[#0f0e0e] rounded-2xl p-5 flex flex-col items-center'>
          <div className='w-full'>
            <p className='text-[gray] text-[14px] mt-3'>Username</p>
            <div className="inputBox">
              <input onChange={(e) => { setUsername(e.target.value) }} value={username} type="text" placeholder='Username' required />
            </div>

            <p className='text-[gray] text-[14px] mt-3'>Email</p>
            <div className="inputBox">
              <input onChange={(e) => { setEmail(e.target.value) }} value={email} type="email" placeholder='Email' required />
            </div>

            <p className='text-[gray] text-[14px] mt-3'>Password</p>
            <div className="inputBox">
              <input onChange={(e) => { setPwd(e.target.value) }} value={pwd} type="password" placeholder='Password' required />
            </div>

            <p className='text-[14px] text-[gray] mt-3'>Already have an account <Link to="/login" className='text-purple-600'>Login</Link></p>

            <p className='text-[14px] text-red-500 mt-1 mb-3'>{error}</p>
            <button className="btnNormal w-full">Register</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;