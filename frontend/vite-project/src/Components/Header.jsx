import {Box, useTheme, Typography} from '@mui/material'

const Header = ({title, subtitle}) =>{
  const theme = useTheme;
  return(
   <Box>
       <Typography variant='h2'  fontWeight="bold" sx={{mb: "5px", color:"#1aac83"}}>
            {title}
       </Typography>

       <Typography variant='h5' sx={{mb: "15px",  color:"#1aac83"}} >
            {subtitle}
       </Typography>
      
   </Box>
  )
}

export default Header