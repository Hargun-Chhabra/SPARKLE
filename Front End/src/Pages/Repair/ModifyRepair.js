//Vruitka kakadiya - B00927033 (vrutika.kakadiya@dal.ca)

import Grid from "@material-ui/core/Grid";
import TextField from '@mui/material/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import CustomButton from '../../Components/CustomButton';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const ModifyRepair = () => {
  const location = useLocation();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [bag, setBag] = useState(location.state.bag);
  const [_id] = useState(location.state._id)
  const [rstatus, setStatus] = useState('');
  const bagError = bag === '' && formSubmitted;
  const statusError = rstatus === '' && formSubmitted;
 
  const handleBagChange = (event) => {
    setBag(event.target.value);
  };
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (bag === '' || rstatus === '') {
      setFormSubmitted(true);
      return;
    } else {
    const data = JSON.stringify({
      "status": rstatus
    });

    const config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `https://sparkle-api.onrender.com/repair/modify/${_id}`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios.request(config)
      .then((response) => {
        Swal.fire({
          title: 'Status Changed Successfully ',
          position: 'top-end',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        }).then(function () {
          window.location.href = "/trackRepair";
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  }
  return (

    <div style={{ marginTop: '15%' }}>
      <form >
        <Grid container spacing={2} alignItems="center" style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}>
          <Grid item>
            <TextField
              label="Repair bag number*"
              variant="outlined"
              type="number"
              style={{ width: '235px' }}
              value={bag}
              error={bagError}
              onChange={handleBagChange}
              helperText={bagError ? 'This field is required' : ''} />
          </Grid>
          <Grid item>
            <TextField select label="Status*" variant="outlined" style={{ width: '235px', marginTop: '15%' }}
              value={rstatus}
              error={statusError}
              onChange={handleStatusChange}
              helperText={statusError ? 'This field is required' : ''} >
              <MenuItem value="Ready to Pickup">Ready to Pick up</MenuItem>
              <MenuItem value="Complete">Complete</MenuItem>
              <MenuItem value="Return">Return</MenuItem>
            </TextField>
          </Grid>


          <Grid item style={{ marginTop: '2%' }}>

            <CustomButton
              label="Submit"
              type="submit"
              onclickFunction={handleSubmit}
            ></CustomButton>
          </Grid>

        </Grid>
      </form>
    </div>
  );
}
export default ModifyRepair;
