/**
 * Author : Dev Prtap Singh Rajawat
 * Banner No : B00922348
 * Email: dv269119@dal.ca
 */
import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useLocation } from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import { Buffer } from 'buffer';
import {useCart} from 'react-use-cart';
const ProductDetails = () => {
  const {isEmpty ,addItem} = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.state);
  const buyNowHandle=(stock)=>{
    if(isEmpty){
    addItem({ ...stock, id: stock.product_name });
    }
    navigate( '/CheckoutPage'); 
  }
  const addToList=(stock) =>{
    console.log(stock.product_name)
    addItem({ ...stock, id: stock.product_name });
    window.alert("Item Added to List");
  }
  const viewCart=()=>{
    navigate('/CartPage');
  }
  return (
    <div>
      <Container maxWidth="md">
      <Grid container spacing={2} sx={{marginTop:'40px', alignContent:'center'}}>
          {location.state.map((stock, index) => {
            const imgData = new Buffer(stock.image.data.data).toString('base64');
            return (
                <Grid item xs={12} sm={12} md={4}>
                <Card sx={{height:'100%'}}>
                  <CardMedia component="img"
                    image={`data:image/png;base64,${imgData}`}
                    sx={{ height: 200 }} 
                    title={stock.product_name}
                  />
                  <CardContent align='center'>
                    <Typography gutterBottom name="productName" fontSize={25}>
                      {stock.product_name}
                    </Typography>
                    <Typography gutterBottom name="productName">
                      {stock.product_description}
                    </Typography>
                    <Typography gutterBottom variant="body2" color="text.secondary" name="qty" >
                      Available Qty : {stock.qty}
                    </Typography>
                    <Typography gutterBottom variant="body1" color="text.secondary" name="price">
                      Price : {"$" + stock.price}
                    </Typography>
                    </CardContent>
      <CardActions>
        <Button variant="contained" style={{backgroundColor: '#5c6869', borderColor: 'green'}} onClick={()=>addToList(stock)}>Add to Cart</Button>
        <Button variant="contained" style={{backgroundColor: '#5c6869', borderColor: 'green', marginLeft:'5%'}} onClick={()=>buyNowHandle(stock)}>Buy Now</Button>
      </CardActions>
      <Button variant="contained" style={{backgroundColor: '#5c6869', borderColor: 'green', marginLeft: '25%'}} onClick={()=>viewCart()}>Go to Cart</Button>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  )
}

export default ProductDetails