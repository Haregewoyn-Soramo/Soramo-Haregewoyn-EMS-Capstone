import { UseAuthContext} from '../hooks/UseAuthContext'

export const UseLogout = () =>{
  const {dispatch} = UseAuthContext()
  const logout = () =>{
    localStorage.removeItem('user')

    dispatch({type: 'LOGOUT'})
  }
  return{logout}
}

