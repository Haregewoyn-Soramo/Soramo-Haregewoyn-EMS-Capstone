import { createTheme } from '@mui/material/styles';
import './App.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import {themeSettings} from './state/theme';
import { useSelector } from 'react-redux';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import { useMemo } from 'react';
import Dashboard from './scenes/Dashboard'
import Layout from './scenes/Layout'
import KPI from './scenes/KPI'
import Tasks from './scenes/Tasks'
import EmployeesOfCompany from './scenes/Employee';
import Report from './scenes/Report';
import Login from './scenes/Login';
import { UseAuthContext } from './hooks/UseAuthContext';
import CreateKPI from './scenes/CreateKPI';
import CreateTask from './scenes/CreateTask';
import NotifMessage from './scenes/NotifMessage';
import Date from './scenes/Date';
import HoursWorked from './scenes/HourWorkde';
import QualityOfWork from './scenes/QualityofWork';
import LoginAndLogout from './scenes/LoginAndLogoutTime';
import Logout from './scenes/Logout';
import AddEmployee from './scenes/AddEmployee';





function App() {
  const mode = useSelector((state)=>state.global.mode);
  const theme = useMemo(()=>createTheme(themeSettings(mode)),[mode]);
  const {user} = UseAuthContext()


  return (
   <div className='app'>
    <BrowserRouter>
    <ThemeProvider theme={ theme}>
         <CssBaseline/>
         <Routes>
            <Route path='/signin' element={!user ? <Login /> : <Navigate to='/dashboard' />} />
            <Route element = {<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path= '/dashboard' element = {< Dashboard />} />
            <Route path= '/KPI' element={user ? <KPI /> : <Navigate to="/signin" />} />
            <Route path= '/tasks' element={user ? <Tasks /> : <Navigate to="/signin" />} />
            <Route path= '/Employees' element={user ? <EmployeesOfCompany /> : <Navigate to="/signin" />} />
            <Route path= '/Custom' element={user ? <Report /> : <Navigate to="/signin" />} />
            <Route path= '/message' element={user ? <NotifMessage /> : <Navigate to="/signin" />}/>
            <Route path= '/date' element={user ? <Date /> : <Navigate to="/signin" />} />
            <Route path= '/createkpi' element={user ? <CreateKPI /> : <Navigate to="/signin" />} />
            <Route path= '/createtask' element={user ? <CreateTask /> : <Navigate to="/signin" />} />
            <Route path= '/hours' element = {user? <HoursWorked/> : <Navigate to="/signin"/>} />
            <Route path= '/quality' element={user ? <QualityOfWork /> : <Navigate to="/signin" />} />
            <Route path= '/login' element={user ? <LoginAndLogout /> : <Navigate to="/signin" />} />
            <Route path= '/logout' element={<Logout />} />
            <Route path= '/addemployee' element={user ? <AddEmployee /> : <Navigate to="/signin" />}/>
           </Route>
         </Routes>
      </ThemeProvider>
    </BrowserRouter>
      
   </div>
  )
}

export default App
