/**
 * Author : Hargun Chhabra
 * Banner No : B00899294
 * Email: Hargun.Chhabra@dal.ca
 */
// The code was reffered from  the code in [React + Axios - HTTP POST Request Examples](https://jasonwatmore.com/post/2020/07/17/react-axios-http-post-request-examples) 

import React, { useState } from "react";
import CustomButton from '../../Components/CustomButton';
import axios from "axios";
import {useNavigate} from "react-router-dom";

function UpdateForm() {
  const [updateField, setUpdateField] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [email, setEmail] = useState("");
  const [updateValue, setUpdateValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate=useNavigate();

  const handleSelectChange = (event) => {
    setSelectedField(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUpdateValueChange = (event) => {
    setUpdateValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();



  try{
    const authtoken = localStorage.getItem('authtoken');
      const email = localStorage.getItem('updateemail');
      const obj = {
        authtoken,
        email,
        updatepayload:{[selectedField]: updateValue},
      };
      
    await axios.put('https://sparkle-api.onrender.com/user/updateuser',obj).then(response => {console.log(response);navigate("/Profile");});
  }catch(error){
    
  }
  };

  return (
    <div className="containerind">
    <form onSubmit={handleSubmit}>
      <label>
        Update Field :
        <select value={selectedField} onChange={handleSelectChange}>
          <option value="">--Select Field--</option>
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="password">Password</option>
          <option value="phone">Phone</option>
        </select>
      </label>
      <br />
      <label>
        Update Value:
        <input
          type="text"
          value={updateValue}
          onChange={handleUpdateValueChange}
        />
      </label>
      <div className="containerind2">
      <CustomButton type="submit" label="Update" onclickFunction={handleSubmit}></CustomButton>
      </div>
      <br />
      {errorMessage && <div className="error">{errorMessage}</div>}
</form>
</div>
  );
}
export default UpdateForm;
