//Vruitka kakadiya - B00927033 (vrutika.kakadiya@dal.ca)

import Grid from "@material-ui/core/Grid";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './modal.css';
import CustomButton from '../../Components/CustomButton';
import React, { useState, useRef } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const RepairForm = () => {
  const [phonenum, setPhone] = useState('');
  const [bagnum, setBag] = useState('');
  const [cusname, setFname] = useState('');
  const [description, setDesc] = useState('');
  const [repaircost, setCost] = useState('');
  const [status, setStatus] = useState('');
  const [instruction, setInstruction] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (phonenum === '' || bagnum === '' || cusname === '' || description === '' || repaircost === '' || status === '' || instruction === '') {
      setFormSubmitted(true);
      return;
    }
    if (phonenum.length < 10 || phonenum.length > 10) {
      Swal.fire({
        title: 'Phone Number must be 10 digits',
        position: 'top-end',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
    if (bagnum.length < 6 || bagnum.length > 6) {
      Swal.fire({
        title: 'Bag Number must be 6 digits',
        position: 'top-end',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }

    let jsonObj = {
      phonenum: phonenum,
      bagnum: bagnum,
      status: status,
      instruction: instruction,
      cusname: cusname,
      description: description,
      repaircost: repaircost,
    }
    console.log("JSON OBJECT", jsonObj)
    axios.post('https://sparkle-api.onrender.com/repair/create', jsonObj)
    Swal.fire({
      title: 'Repair Added Successfully ',
      position: 'top-end',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500
    }).then(function () {
      window.location.href = "/createRepair";

    })
      .catch(function (error) {
        console.log(error);
      });
  }
  const phoneError = phonenum === '' && formSubmitted;
  const bagError = bagnum === '' && formSubmitted;
  const nameError = cusname === '' && formSubmitted;
  const descError = description === '' && formSubmitted;
  const costError = repaircost === '' && formSubmitted;
  const statusError = status === '' && formSubmitted;
  const instructionError = instruction === '' && formSubmitted;

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };
  const handleBagChange = (event) => {
    setBag(event.target.value);
  };
  const handleNameChange = (event) => {
    setFname(event.target.value);
  };
  const handleDescChange = (event) => {
    setDesc(event.target.value);
  };
  const handleCostChange = (event) => {
    setCost(event.target.value);
  };
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  const handleInstructionChange = (event) => {
    setInstruction(event.target.value);
  };

  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current.setNativeProps({ textAlign: 'left' });
  };

  return (
    <div style={{ marginTop: '5%' }}>
      <form >
        <Grid container alignItems="center" direction="column">
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 3, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <Grid item>
              <TextField
                id="outlined-basic"
                label="Phone Number*"
                type="number"
                value={phonenum}
                error={phoneError}
                onChange={handlePhoneChange}
                helperText={phoneError ? 'This field is required' : ''}
              />
              <TextField
                id="outlined-multiline"
                label="Repair Bag Number*"
                type="number"
                value={bagnum}
                error={bagError}
                onChange={handleBagChange}
                helperText={bagError ? 'This field is required' : ''}
              />

            </Grid>
            <Grid item>
              <TextField
                label="Name*"
                type="text"
                name="fname"
                value={cusname}
                error={nameError}
                onChange={handleNameChange}
                helperText={nameError ? 'This field is required' : ''}
                inputProps={{ style: { textAlign: 'left' } }}
              />

              <TextField
                label="Description*"
                type="text"
                name="description"
                value={description}
                error={descError}
                onChange={handleDescChange}
                helperText={descError ? 'This field is required' : ''}
                style={{ textAlign: 'left' }}
                inputProps={{ style: { textAlign: 'left' } }}
              />

            </Grid>
            <Grid item>
              <TextField
                label="Estimated Cost*"
                type="number"
                name="cost"
                value={repaircost}
                error={costError}
                onChange={handleCostChange}
                helperText={costError ? 'This field is required' : ''}
              />
              <TextField
                label="Status*"
                type="text"
                name="rstatus"
                value={status}
                error={statusError}
                onChange={handleStatusChange}
                helperText={statusError ? 'This field is required' : ''}
                style={{ textAlign: 'left' }}
                inputProps={{ style: { textAlign: 'left' } }}
              />
            </Grid>
            <Grid>
              <TextField
                label="Repair Instruction*"
                type="text"
                style={{ width: '92%', textAlign: 'left' }}
                value={instruction}
                error={instructionError}
                onChange={handleInstructionChange}
                helperText={instructionError ? 'This field is required' : ''}
                inputProps={{ style: { textAlign: 'left' } }}

              />
            </Grid>

            <Grid item>

              <CustomButton onclickFunction={handleSubmit}
                label="Create"
                type="submit"

              />

            </Grid>
          </Box>
        </Grid>

      </form>

    </div>
  )
}

export default RepairForm
