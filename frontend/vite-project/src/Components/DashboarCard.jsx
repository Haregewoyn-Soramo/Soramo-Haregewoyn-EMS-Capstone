import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

export default function DashboardCard() {

  const companyLeaders=[
    {
      image: 'https://images.pexels.com/photos/834863/pexels-photo-834863.jpeg?auto=compress&cs=tinysrgb&w=600',
      name: "John Smith",
      position:"CEO",
      description:"John is a seasoned CEO with six years of project management experience."
    },
    {
      image:"https://images.pexels.com/photos/3184611/pexels-photo-3184611.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Adom Ben",
      position: "Director",
      description:"Adom is a seasoned director with six years of project management experience."
    },
    {
      image:"https://images.pexels.com/photos/2422287/pexels-photo-2422287.jpeg?auto=compress&cs=tinysrgb&w=600",
      name:"Jane Doe",
      position:"Manager",
      description:"Jane is a seasoned manager with six years of project management experience. "
    }
  ]

  return (
    <Box display="flex" gap="1rem">
      { companyLeaders.map((person, index) => (
        <Card sx={{ maxWidth: "400px", flexGrow: 1, marginRight: index !== companyLeaders.length - 1 ? '1rem' : 0 }} key={person.name}>
          <CardMedia
            sx={{ height: 200 }}
            image={person.image}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" color="blanchedalmond" component="div">
              {person.name}
            </Typography>
            <Typography gutterBottom fontSize="12px"  component="div">
              {person.position}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {person.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
}
