import React, { useRef } from 'react'
import { Outlet, NavLink,Link } from "react-router-dom";
import '../Style/Login.css'


const Login = () => 
{

  let email = useRef()
  let password = useRef()


  let handleSubmit= async(e)=>
    {
      e.preventDefault()
      let data={
  
        email:email.current.value,
        password:password.current.value,
      }
     
      try {
        let response = await fetch('http://localhost:8081/userLogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
  
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const result = await response.json();
        console.log("result is ", result);
  
    } catch (error) {
        console.error('Fetch error:', error);
    }
    }
  return (
    <div>
      <div className='img'>
        <div className='inin'>
          <form action="" onSubmit={handleSubmit} >
            <h1 style={{ color: "white" }} >Login</h1>
            <br />

            <div className='inpusbox'><i class="bi bi-envelope-at-fill">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-envelope-at-fill" viewBox="0 0 16 16">
                <path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2zm-2 9.8V4.698l5.803 3.546L0 11.801Zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586l-1.239-.757ZM16 9.671V4.697l-5.803 3.546.338.208A4.482 4.482 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671" />
                <path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791Z" />
              </svg>
            </i>
              <input type="email" placeholder='Enetr user e-mail' className='inputs' ref={email}/>
            </div><br />


            <div className='inpusbox'>
              <i class="bi bi-lock-fill">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16">
                  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2" />
                </svg>
              </i>
              <input type="password" placeholder='Enetr user password' className='inputs' ref={password} />
            </div>
            <button className='login-button'>Login</button>
            <div className='ragistar'>
              <p>Don't have an Account:
                <NavLink to="/Registration">Registration</NavLink>
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Login