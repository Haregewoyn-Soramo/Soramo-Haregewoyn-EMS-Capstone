import { useContext } from "react"
import { AuthContext } from "../Context/AuthContext"


export const UseAuthContext = ()=>{
  const context = useContext(AuthContext)

  if(!context){
    throw Error('AuthContext must be used inside a AuthContextProvide')
  }

  return context
}