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




function App() {
  const mode = useSelector((state)=>state.global.mode);
  const theme = useMemo(()=>createTheme(themeSettings(mode)),[mode]);

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
           </Route>
         </Routes>
      </ThemeProvider>
    </BrowserRouter>
      
   </div>
  )
}

export default App
