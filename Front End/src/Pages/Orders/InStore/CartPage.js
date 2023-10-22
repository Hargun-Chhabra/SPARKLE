/**
 * Author : Dev Prtap Singh Rajawat
 * Banner No : B00922348
 * Email: dv269119@dal.ca
 */
import React from 'react'
import Cart from '../../../Components/Cart';
import {
    Container, 
    Typography, 
    Button,
  } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

//will use Cart component to display cart details here 
const CartPage = () => {
    const navigate = useNavigate();
    const shopMore=()=>{
        navigate('/SearchPage');
    }
    const placeOrder = ()=>{
        navigate( '/CheckoutPage');
    }
  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Shopping Cart
      </Typography>    
      <Cart/>
          <Button color="secondary"  variant="contained" align='left' style={{marginTop:'10px' ,backgroundColor: '#5c6869', borderColor: 'green'}} onClick={()=>shopMore()}>Back to Shopping</Button>
          <Button color="secondary" align="right" variant="contained" style={{marginTop:'10px', marginLeft:'5px', backgroundColor: '#5c6869', borderColor: 'green'}} onClick={()=>placeOrder()}>Place Order</Button>
          
        </Container>
  );
}

export default CartPage