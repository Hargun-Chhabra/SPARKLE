/**
 * Author : Sakshi Chaitanya Vaidya
 * Banner No : B00917159
 * Email: sakshi.vaidya@dal.ca
 */

import React from 'react'
import StockCardView from '../../Components/StockCardView'
import { useEffect, useState } from 'react'
import axiosApi from '../../Common/AxiosApi';
import { useNavigate } from 'react-router-dom';

function ViewStock() {

  const [stock, setStock] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    let role = localStorage.getItem('role')
    if (role !== 'admin' && role !== 'sales associate') {
      navigate('/Login')
    }
});

    useEffect(() => {

        const stockUrl = "/inventory/viewStock"

        axiosApi.get(stockUrl)
            .then(res => {
              console.log(res.data.stock);
                const stockDet = [];
                stockDet.push(res.data.stock);
                console.log(stock)
                stockDet.map((stock) => {
                    setStock(stock);
                    return(<></>)
                });
            });
        console.log(stock);
    },[]

    );
 
  //everything must be from database
  
  return (
   
    
   <div>
    <StockCardView stock = {stock}/>
   </div>
  
  )
}

export default ViewStock