/**
 * Author : Dev Prtap Singh Rajawat
 * Banner No : B00922348
 * Email: dv269119@dal.ca
 */
import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import { Grid } from '@mui/material';
import { Container } from '@mui/system';
import { Buffer } from 'buffer';

const Productlist = (props) => {
    
const navigate = useNavigate();
let filteredData;
console.log(props.searchinput);
  const handleCardClick= event =>{
          console.log(event.currentTarget.id);
          let finalProduct = props.stock.filter(item => item.product_name === event.currentTarget.id)
          console.log(finalProduct);
          navigate('/ProductDetails', {state: finalProduct});
    }
if(props.searchinput)
{
    filteredData = props.stock.filter(item => item.product_name.toLowerCase().includes(props.searchinput.toLowerCase()))
    console.log(filteredData);
}
if(filteredData.length===0)
{
    filteredData = props.stock;
    console.log("No product found");
    console.log(filteredData);
}
  return (
    <div>
      <Container maxWidth="md">
      <Grid container spacing={2} sx={{marginTop:'40px', alignContent:'center'}}>
          {filteredData.map((stock, index) => {
            const imgData = new Buffer(stock.image.data.data).toString('base64');
            return (
                <Grid item xs={12} sm={6} md={4}>
                <Card sx={{height:'100%'}}>
                <CardActionArea id={stock.product_name} target="_blank" rel="noopener" onClick={handleCardClick}>                 
                  <CardMedia component="img"
                    image={`data:image/png;base64,${imgData}`}
                    sx={{ height: 250 }} 
                    title={stock.product_name}
                  />
                  <CardContent align='left'>
                    <Typography name="productName">
                      {stock.product_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" name="qty" >
                      Qty : {stock.qty}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" name="price">
                      Price : {"$" + stock.price}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={handleCardClick}>Order</Button>
                  </CardActions>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default Productlist