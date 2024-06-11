import { useState } from "react";
import { useAddEmployeeMutation } from "../state/api";
import { Box, TextField, Button, Typography, Snackbar} from "@mui/material";
import Header from "../Components/Header";
import { motion } from 'framer-motion';




const AddEmployee = ()=>{
  
  const [success, setSuccess]= useState('')
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [addEmp, {isloading}] = useAddEmployeeMutation()
  const [newEmp, setNewEmp] =useState({
    name:'',
    email:'',
    role:'',
    password:'',
    position:'',
    department:'',
    phone_number: ''
  })

  const handleSubmit = async(e)=>{
     e.preventDefault()
     try {
        const result = await addEmp(newEmp).unwrap()
        console.log('employee added successfully:', newEmp)
        console.log('Api Response:', result)
        setOpenSnackbar(true)
        setSuccess('New Employee Added Successfully')
        setNewEmp({
          name:'',
          email:'',
          role:'',
          password:'',
          position:'',
          department:'',
          phone_number: ''
        })
     } catch (error) {
      console.error('Error submitting form:', error);
      setError('Error Adding New Employee')  
     }
  }

  const handleChange = (e)=>{
    const {name, value} = e.target
    setNewEmp((prev) => ({ ...prev, [name]: value}));
  }


  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };


  return(
      
    <Box m="1.5rem 2.5rem">
      <Header title="Employees" subtitle="Committed to Excellence" />
          <Box component='form'  sx={{'& .MuiTextField-root': { m: 1, width: '50%' }, }} 
                                    noValidate
                                    autoComplete="off"
                                    onSubmit={handleSubmit}>
          <div style={{ margin:'auto',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',}}>
            <h2>Employee Form</h2>                      
            <TextField
                name="name" 
                label = "Name"
                value= {newEmp.name}
                onChange={handleChange}
                required
            />
           <TextField
              name="role"
              label = 'Role'
              value={newEmp.role}
              onChange={handleChange}
              required
           />
           <TextField
               name="position"
               label = 'Postion'
               value={newEmp.position}
               onChange={handleChange}
               required
           />
             <TextField
                 name="department"
                 label ='Department'
                 value={newEmp.department}
                 onChange={handleChange}
                 required
             />
        <TextField
            name="email"
            label ="Email"
            type="email"
            value={newEmp.email}
            onChange={handleChange}
            required
        />
          <TextField
             name="password"
             label='Password'
             type="password"
             value={newEmp.password}
             onChange={handleChange}
             required
          />
          <TextField
               name="phone_number"
               label='Phone Number'
               type="tel"
               value={newEmp.phone_number}
               onChange={handleChange}
               required
          />
           <Button type="submit" variant="contained" color="primary" sx={{display:'block',width: '50%'}}> Submit</Button>
          
              <Snackbar
              open={openSnackbar}
              autoHideDuration={6000}
              onClose={handleCloseSnackbar}
              message={success}
            />
      </div>
          </Box>
          <Box sx={{  width: "50%", height: "150px", marginTop: "50px", marginBottom: "50px", margin: "auto", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h5" color="gray" textAlign="center">
              Stay organized, stay productive. Efficient time management leads to success. Prioritize tasks, manage your schedule wisely, and watch your achievements grow!
              </Typography>
          </Box>
          <motion.footer
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ background: "#1aac83", padding: "1rem", textAlign: "center", marginTop: "auto" }}
          >
          <Typography variant="body1" color="white">
            © 2024 Your Company. All rights reserved. | <a href="#" style={{ color: "#ffffff" }}>Privacy Policy</a> | <a href="#" style={{ color: "#ffffff" }}>Terms of Service</a>
          </Typography>
          </motion.footer>
          </Box>

  )
}

export default AddEmployee;