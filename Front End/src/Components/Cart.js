/**
 * Author : Dev Prtap Singh Rajawat
 * Banner No : B00922348
 * Email: dv269119@dal.ca
 */
import React from 'react'
import {useCart}  from 'react-use-cart';
import { Buffer } from 'buffer';
import { AddCircle, RemoveCircle } from '@mui/icons-material';
import {
    Container, 
    Typography, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper, 
    IconButton, 
    Grid,
    Card,
    CardMedia,
    Button,
  } from '@material-ui/core';

const Cart = () => {
    const {isEmpty,
        totalUniqueItems,
        items,
        cartTotal,
        updateItemQuantity,
        removeItem,
    } =useCart();
    if(isEmpty) return <h1 className='text-center'>Your Cart is Empty</h1>
  return (
    <Container maxWidth="md">
      <Typography variant="h6" align="left" gutterBottom sx={{marginTop:'20px'}}>
        Total Items: {totalUniqueItems}
      </Typography>
      <TableContainer component={Paper} >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product Image</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
          {items.map((item, index) => {
            const imgData = new Buffer(item.image.data.data).toString('base64');
            return(
                <TableRow key={index}>
                <TableCell>
                  <Grid container spacing={6}>
                    <Grid item xs={4}>
              <Card>
                <CardMedia
                  component="img"
                  image={`data:image/png;base64,${imgData}`}
                  alt={item.title}
                />
                </Card>
                </Grid>
                </Grid>
                </TableCell>
                <TableCell>{item.product_name}</TableCell>
                  <TableCell>{item.price} USD</TableCell>
                  <TableCell>
                  <IconButton onClick={() => updateItemQuantity(item.id,item.quantity-1)}>
                      <RemoveCircle />
                    </IconButton>
                    {item.qty=item.quantity}
                    <IconButton onClick={() => updateItemQuantity(item.id,item.quantity+1)}>
                      <AddCircle />
                    </IconButton>
                    
                  </TableCell>
                
                <TableCell>
                  <Button 
                    size="small" 
                    color="secondary" 
                    variant='contained'
                    style={{backgroundColor: '#5c6869', borderColor: 'green'}}
                    onClick={()=>removeItem(item.id)}
                  >
                    Remove
                  </Button>
                </TableCell>
            </TableRow>
            );
          })}
          <TableRow>
            <TableCell colSpan={4} align='right'>Total Price: </TableCell>
            <TableCell align="right" >${cartTotal.toFixed(2)}</TableCell>
          </TableRow>
          </TableBody>
          </Table>
          </TableContainer>
          
        </Container>
  );
}

export default Cart