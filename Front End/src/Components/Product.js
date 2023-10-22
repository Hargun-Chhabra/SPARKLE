import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useLocation } from 'react-router-dom';
import {useNavigate} from "react-router-dom";
const Product = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const buyNowHandle=()=>{
    navigate( '/CheckoutPage');
  }
  return (
    <Card sx={{ width: '60%', display: 'flex', marginLeft: '20%', marginTop: 5}}>
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
    <CardMedia sx={{flex: '1 0 auto'}} 
      component= "img"
      alt="Diamond Ring"
      height="350"
      image="/static/media/ring.fba4bd6cfaf92e21dd49.png"
    />
    <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{marginLeft:'10%'}}>
            Product Id: {location.state}
        </Typography>
      </CardContent>
      </Box>
      <Box sx={{marginTop: 10, marginLeft:'5%'}}>
      <Typography variant="h4" gutterBottom>
        5.51 Carat H-VS2 Excellent cut
      </Typography>
      <Typography variant="h4" gutterBottom>
        Diamond Ring
      </Typography>
      <Typography variant="h5" gutterBottom>
        Price: 1500$
      </Typography>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="ringSize">Ring Size</InputLabel>
        <Select
          labelId="ringSize"
          id="ringSize"
          //value={size}
          //onChange={handleChange}
          label="Size"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={7}>7</MenuItem>
        </Select> 
      </FormControl>
      <CardActions sx={{marginTop: 3}}>
        <Button variant="contained" style={{backgroundColor: '#5c6869', borderColor: 'green'}}>Add to List</Button>
        <Button variant="contained" style={{backgroundColor: '#5c6869', borderColor: 'green', marginLeft:'5%'}} onClick={buyNowHandle}>Buy Now</Button>
      </CardActions>
      </Box>
    </Card>
  )
}

export default Product