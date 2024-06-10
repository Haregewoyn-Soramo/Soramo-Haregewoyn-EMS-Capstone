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
          <Route element = {<Layout />}>
            <Route path= '/' element = {<Navigate to = '/dashboard' replace />} />
            <Route path= '/dashboard' element = {< Dashboard />} />
            <Route path= '/KPI' element = {< KPI />} />
            <Route path= '/tasks' element = {< Tasks/>} />
            <Route path= '/Employees' element = {< EmployeesOfCompany/>} />
            <Route path= '/Custom' element = {< Report/>} />
            <Route path= '/login' element = {user ? < Login/> : <Navigate to= '/'/>} />
            <Route path= '/message' element = {<NotifMessage/>} />
            <Route path= '/date' element = {<Date/>} />
            <Route path= '/createkpi' element = {<CreateKPI/>} />
            <Route path= '/createtask' element = {<CreateTask/>} />
            <Route path= '/hours' element = {<HoursWorked/>} />
           </Route>
         </Routes>
      </ThemeProvider>
    </BrowserRouter>
      
   </div>
  )
}

export default App
