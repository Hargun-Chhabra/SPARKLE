/**
 * Author : Hargun Chhabra
 * Banner No : B00899294
 * Email: Hargun.Chhabra@dal.ca
 */

// The reference for code was taken from the code in [Fetch Api documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) and code in [Bootstrap cards documentation](https://react-bootstrap.github.io/components/cards/)
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {useNavigate} from "react-router-dom";

function EmpProfile(){

    const [user,setUser]=useState({});
    const [error,setError]=useState(false);
    const [errormessage,setErrormessage]=useState('');
    const id=localStorage.getItem("email")
    const navigate=useNavigate();

    useEffect(() => {
      const fetchEmpList = async () => {
        try {
          const response = await fetch("https://sparkle-api.onrender.com/user/getuserdetail", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: localStorage.getItem('email') })
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setUser(data);
          localStorage.setItem('updateemail',localStorage.getItem('email'))
         
        } catch (error) {
          
          setError("some problem while deleting")
        }
      };
      fetchEmpList();
      
    }, []);


    const remove = async (event)=>{

      try {
        const response = await fetch("https://sparkle-api.onrender.com/user/delete", {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({authtoken: localStorage.getItem('authtoken'), email: user.email })
        });
        if (!response.ok) {
      
          throw new Error('Network response was not ok');
        }
        const data =  response.json();
        
        navigate("/Profile")
        
      } catch (error) {
        
        setError(true)
        setErrormessage('some problem with deleting user or you dont have the necessary permission try again or call support')
      }
   
   
  
  }

    const styles = {

      cardImage: {
        width: '10vw',
        height: '10vh'
      }
    }
const removeerror=()=>{
  setError(false)
  setErrormessage('')
}
const updatepage=()=>{
  navigate('/updateemployee')
}

    return (
      <div>
        <Card>
          <Card.Body>
          <Card.Title>{user.name}</Card.Title> 
            <Card.Subtitle>{user.email}</Card.Subtitle>
            <Card.Text>{user.phone}</Card.Text>
            <Card.Text>{user.role}</Card.Text>
            <Button variant="primary" onClick={remove}>Delete</Button>
            <Button variant="primary" onClick={updatepage}>Update</Button>
            {error && <div style={{ color: 'red' }}>{errormessage}</div>}
            {error && <button style={{ color: 'red' }} onClick={removeerror}>ok</button>}
          </Card.Body>
        </Card>
 
    </div>

    );


      

};



export default EmpProfile;
