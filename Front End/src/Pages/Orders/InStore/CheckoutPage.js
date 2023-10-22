/**
 * Author : Dev Prtap Singh Rajawat
 * Banner No : B00922348
 * Email: dv269119@dal.ca
 */
import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Cart from '../../../Components/Cart';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useCart } from 'react-use-cart';
import CustomerValidation from './CustomerValidation';
import { useEffect } from 'react';
import axios from 'axios';



const CheckoutPage = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const {isEmpty,
      items,
      cartTotal,
      emptyCart,
  } =useCart();
  const [values,setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    contact: "",
    city: "",
    zip: "",
});
  const handleChange=(event) =>{
    setValues({...values,
    [event.target.name]:event.target.value,});
}
 const backToCart=()=>{
  navigate('/Cartpage');
 }
 const insertOrder = async (data) => {
  console.log("DATA 1:: ", data);
  let dbJson = JSON.parse(JSON.stringify(data));
  console.log("Dbjson", dbJson)
  let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://sparkle-api.onrender.com/order/addOrder',
      withCredentials: false,
      headers: {
        'Content-Type' : 'application/json'
      },
      data: dbJson
  };
  try {
      var response = await axios(config);
      console.log("DATA 2 :: ", data);
      console.log(JSON.stringify(response.data));
      navigate('/SearchPage', {
          replace: true,
          state: {
              data: data
          }
      });
  } catch (error) {
      console.log("ERROR!!!")
      console.log(JSON.stringify(error.message));
  }
}


 useEffect(()=>{
  setErrors(CustomerValidation(values))
 },[values]);
const handleSubmit= (event)=>{
  event.preventDefault();
  console.log(errors);
  if(Object.keys(errors).length === 0){
  if(isEmpty){
    window.alert("Cart is Empty Do some shopping");
  }
  window.alert("order Placed Successfull, Continue Shopping");
  emptyCart();
  navigate('/searchPage');
  console.log(values);
  console.log(items);  
  let customerName=values.firstName;
  let today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            let min = 1;
            let max = 100;
            var rand =  min + (Math.random() * (max-min));
  let orderId=("Order"+rand);
  let orderDate=date;
  let totalPrice=cartTotal;
  let orderDetails = items;
  let customerDetails = values;
  let data={orderId,orderDate,customerName,totalPrice,customerDetails,orderDetails}
  insertOrder(data);
  
  }
 }

    return (
      <Container maxWidth='lg' >
      <Typography variant="h4" align="center" gutterBottom>
        Checkout Page..
      </Typography>    
      <form>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={5}>
        <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Customer Details:
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField sx={{textAlign : 'left'}}
            required
            id="firstName"
            name="firstName"
            label="First name"
            type="name"
            fullWidth
            autoComplete="given-name"
            value={values.firstName} onChange={handleChange}
            variant="standard"
          />
          {errors.firstName && <p className='error'>{errors.firstName}</p>}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField sx={{textAlign : 'left'}}
            required
            id="lastName"
            name="lastName"
            label="Last name"
            type="name"
            fullWidth
            autoComplete="family-name"
            value={values.lastName} onChange={handleChange}
            variant="standard"
          />
          {errors.lastName && <p className='error'>{errors.lastName}</p>}
        </Grid>
        <Grid item xs={12}>
          <TextField sx={{textAlign : 'left'}}
            id="email"
            name="email"
            label="Email"
            type="email"
            fullWidth
            autoComplete="email"
            variant="standard"
            value={values.email} onChange={handleChange}
          />
          {errors.email && <p className='error'>{errors.email}</p>}
        </Grid>
        <Grid item xs={12}>
          <TextField sx={{textAlign : 'left'}}
            required
            id="address"
            name="address"
            type="text"
            label="Address"
            fullWidth
            autoComplete="shipping address"
            variant="standard"
            value={values.address} onChange={handleChange}
          />
          {errors.address && <p className='error'>{errors.address}</p>}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField sx={{textAlign : 'left'}}
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            value={values.city} onChange={handleChange}
            
          />
          {errors.city && <p className='error'>{errors.city}</p>}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField sx={{textAlign : 'left'}}
            required
            id="contact"
            name="contact"
            label="Contact/Phone"
            fullWidth
            autoComplete="phone"
            variant="standard"
            value={values.contact} onChange={handleChange}

          />
          {errors.contact && <p className='error'>{errors.contact}</p>}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField sx={{textAlign : 'left'}}
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            value={values.zip} onChange={handleChange}
            
          />
          {errors.zip && <p className='error'>{errors.zip}</p>}
        </Grid>
      </Grid>
    </React.Fragment>
        </Grid>
        <Grid item xs={12} sm={7}>
        <Cart />
        </Grid>
        <Button color="secondary"  variant="contained" align='left' style={{marginTop:'10px' ,backgroundColor: '#5c6869', borderColor: 'green'}} onClick={backToCart}>Back to Cart</Button>
        <Button color="secondary" type='submit' align="right" variant="contained" style={{marginTop:'10px', marginLeft:'5px', backgroundColor: '#5c6869', borderColor: 'green'}} onClick={handleSubmit}>Place Order</Button> 
        </Grid>
        </form>
        </Container>
    );
}

export default CheckoutPage
