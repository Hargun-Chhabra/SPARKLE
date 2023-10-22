/**
 * Author : Dev Prtap Singh Rajawat
 * Banner No : B00922348
 * Email: dv269119@dal.ca
 */
import React from 'react'
import axiosApi from '../../../Common/AxiosApi';
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Productlist from '../../../Components/ProductList';
import { CircularProgress } from '@material-ui/core';
const ProductListing = () => {

  const [stock, setStock] = useState([]);
  const location = useLocation();
  const [locading, setLoading] = useState(true);
    useEffect(() => {

        const stockUrl = "/inventory/viewStock"

        axiosApi.get(stockUrl)
            .then(res => {
              console.log(res.data.stock);
                const stockDet = [];
                stockDet.push(res.data.stock);
                console.log("productDetails Page");
                console.log(location.state);
                console.log(stock)
                stockDet.map((stock) => {
                    setStock(stock);
                    return(<></>)
                });
                setLoading(false);
            });
        console.log(stock);
        console.log(location.state);
    },[location.state,stock]

    );
  return (
    <div>
       { locading ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress size={80} style={{ color: '#4caf50' }} />
        Loading ... </div> : <Productlist stock = {stock} searchinput = {location.state}/> }
    </div>
  )
}

export default ProductListing;