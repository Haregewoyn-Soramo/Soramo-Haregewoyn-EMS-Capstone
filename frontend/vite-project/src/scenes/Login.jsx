import { useState } from "react"
import {UseLogin} from "../hooks/UseLogin"



const Login = () =>{
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const {login, isLoading, error} = UseLogin()


const handleSubmit = async (e) =>{
  e.preventDefault();
  await login(email, password)
}

  return(
     <div style={{marginTop: "250px"}}>
      <form onSubmit={handleSubmit} className="loginForm">
      <h2 style={{textAlign:'center', padding: '20px', color: "black"}}>Log In </h2>
      <label htmlFor="email">Email:</label>
      <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email}  />
      <label htmlFor="password"> Password:</label>
      <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} style={{display: 'block'}} />
      <button disabled ={isLoading}>Login</button>
      {error && <div className="errorState">{error}</div>}
     
      </form>
     </div>
  )
}

export default Login