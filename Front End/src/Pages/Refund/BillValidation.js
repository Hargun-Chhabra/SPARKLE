// Neha Dadarwala - neha.dadarwala@dal.ca

import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';

const defaultValues = {
  billnumber: '',
};


const BillValidation = () => {
  const [formValues, setFormValues] = useState(defaultValues)
  const { register, handleSubmit, formState: { errors } } = useForm();
  const Swal = require('sweetalert2')


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const navigate = useNavigate();
  const validateBill = async () => {
    var config = {
      method: 'get',
      url: 'https://sparkle-api.onrender.com/refund/find/' + formValues.billnumber,
      headers: {}
    };

    try {
      var response = await axios(config);
      // console.log("response.data", response.data['0'])
      navigate('/billdetails', {
        state: {
          bill: response.data['0'],
        }
      });
    } catch (error) {
      Swal.fire('Cannot find the bill number')
      setFormValues({ billnumber: "" })
    }
  };

  useEffect(() => {
    let role = localStorage.getItem('role')
    if (role !== 'admin' && role !== 'sales associate') {
      navigate('/Login')
    }
  });



  return (


    <div style={{ marginTop: '20%' }}>
      <form onSubmit={handleSubmit(validateBill)}>
        <Grid container alignItems="center" direction="column">
          <Grid item>
            <TextField
              label="Bill Number"
              type="text"
              value={formValues.billnumber}
              autoFocus
              style={{ width: 250 }}
              InputLabelProps={{ style: { color: '#5c6869' } }}
              {...register("billnumber", {
                onChange: (e) => { handleInputChange(e) },
                required: "Bill Number is required.",
                pattern: {
                  value: /[0-9]{9}/,
                  message: "Should be numbers of minimum length 9"
                }
              })}
              error={Boolean(errors.billnumber)}
              helperText={errors.billnumber?.message}
            />
          </Grid>
          <Grid item>
            <Button style={{
              margin: "20px", backgroundColor: '#444454',
              color: '#bab79d', borderColor: '#b28faa', height: 50, width: 150,
              borderRadius: 7
            }} variant="contained" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>

  )
}

export default BillValidation