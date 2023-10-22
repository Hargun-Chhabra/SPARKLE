/**
 * Author : Hargun Chhabra
 * Banner No : B00899294
 * Email: Hargun.Chhabra@dal.ca
 */
// The code was reffered from the code in [Fetch Api documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) and code in [How can I map through an object in ReactJS?](https://stackoverflow.com/questions/40803828/how-can-i-map-through-an-object-in-reactjs)

import React, { useState, useEffect } from 'react';
import Register from './Register';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

function EmpList() {
  const [people, setPeople] = useState([]);
  const navigate=useNavigate();
  const [error,setError]=useState(false);
  const [errormessage,setErrormessage]=useState('');
  const [peoplecopy,setpeopleCopy]=useState([]);


  useEffect(() => {
    if(usercheck){
     fetchEmpList();}
    

   
  }, []);



  const fetchEmpList = async () => {
    try {
      const response = await fetch("https://sparkle-api.onrender.com/user/getalluser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ authtoken: localStorage.getItem('authtoken') })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
        
      }
      const data = await response.json();
      setPeople(data);
      setpeopleCopy(data);
    } catch (error) {
      
      setError(true)
      setErrormessage("you dont seem to have necessary permisiion or you are not loggedin properly please try again")
      
    }
  };

  const usercheck=()=>{
    if(localStorage.getItem('role')=='admin' || localStorage.getItem('role')=='sales associate'){
        setError(false)
        setErrormessage('')
        return(true)
    }else{
        setError(true)
        setErrormessage('you dont seem to have necessary permisiion or you are not loggedin properly please try again')
        return(false)
        
    }
  }

  const removeerror=()=>{
    if(usercheck()){
    setError(false)
    setErrormessage('')
    navigate('/Profile')}
    else{
      setError(false)
      setErrormessage('')
      navigate('/Login')
    }
  }

  const stylesli = {
    li: "hover",
    cursor: "pointer",
    display: 'block',
    boxShadow: "0 0 2px rgba(0, 0, 0, 0.1)",
    borderRadius: '6px',
    padding: '5px',
    margin: '5px',
    backgroundColor: '#f0f0f0',
  }

  const stylesul = {
    listStyleType: 'none',
  };

  const stylesinput = {
    width: '175vh',
  };

  const clickable = (email) => {
    localStorage.setItem("email", email)
    navigate("/empprofile")
  }

  const searchfunc = (val) => {
    if (val == '' || val == undefined || val == null) {
      setPeople(peoplecopy)
    } else {
      const filteredItems = people.filter((user) => user.name.toLowerCase().includes(val.toLowerCase()));
      setPeople(filteredItems);
    }
  }

  return (
    
    <div>
      <div>{!error &&
        <input
          type="text"
          id="search"
          onChange={(event) => { searchfunc(event.target.value) }}
          placeholder="Search for person with name"
          style={stylesinput}
        />}
      </div>
      <div>
        <ul style={stylesul}>
          {people.map(person => (
            <li key={person.email} onClick={() => clickable(person.email)} style={stylesli}>{person.name}</li>
          ))}
        </ul>
      </div>
      
      <div className='containerind2'>
      {error && <div style={{ color: 'red' }}>{errormessage}</div>}
      {error && <button style={{ color: 'red' }} onClick={removeerror}>ok</button>}
      </div>

    </div>
  );
};




export default EmpList;
