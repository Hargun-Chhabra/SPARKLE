/**
 * Author : Dev Prtap Singh Rajawat
 * Banner No : B00922348
 * Email: dv269119@dal.ca
 */
import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useNavigate} from "react-router-dom";
import Container from '@mui/material/Container';



const SearchBox = () => {
    const [searchInput, setSearchInput] = useState("");
    const [searcherrors, setsearcherrors] = useState({});
    const [isSubmit, setisSubmit] = useState(false);
    let navigate = useNavigate();

    const handleChange = (e) =>{
        setSearchInput(e.target.value);
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        setsearcherrors(validate(searchInput));
        setisSubmit(true);
    };

    const validate = (values) =>{
        const errors = {};
        const regex = /^[a-z ]*[A-Z ]*$/i;
        if(!values){
            errors.msg = "Input is required !!"
        }
        else if(!regex.test(values)){
            errors.msg = "jewelry name should only have characters";
        }
        return errors;
    };

    useEffect(() => { 
        console.log(searcherrors);
        if(Object.keys(searcherrors).length === 0 && isSubmit){
            console.log(searchInput);
            navigate( '/ProductListing',{ state: searchInput});
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    },[searcherrors]);

  return (
    <Container maxWidth='md'>
    <Paper
      sx={{ display: 'flex', alignItems: 'center', height: 70, justifyContent: 'center', marginTop:13 }}
    >
      <InputBase
        placeholder="Enter Product Name..." onChange={handleChange}
      />
        <Button variant="contained" type="submit" style={{backgroundColor: '#5c6869', borderColor: 'green'}} onClick={handleSubmit}>Search</Button>
    </Paper>
    <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', width: '50%', marginLeft:'25%', marginTop:2, color:'purple' }}>
        {searcherrors.msg}
      </Typography>
    </Container>
  )
}

export default SearchBox