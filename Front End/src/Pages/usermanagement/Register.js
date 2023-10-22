/**
 * Author : Hargun Chhabra
 * Banner No : B00899294
 * Email: Hargun.Chhabra@dal.ca
 */

// All the code in this file is adaptation of the code in /component/register.js taken from my [tutorial3](https://git.cs.dal.ca/hchhabra/csci5709/-/tree/tutorial3)  and adaptation of the code in [Fetch Api documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)


import React, {useState,useEffect} from "react";

import CustomButton from '../../Components/CustomButton';
import {useNavigate} from "react-router-dom";
import { Phone } from "@mui/icons-material";

function Register(props){



var bool=false



const [Choice,setChoice]=useState(bool);

const [FirstName,setFirstName]=useState("");
const [LastName,setLastName]=useState("");
const [Email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [phone,setPhone]=useState("");
const [confirmpassword,setConfirmPassword]=useState("");

const [error,setError]=useState(false);
const [errormessage,setErrormessage]=useState('');



const navigate=useNavigate();

const [FirstNameError, setFNameError] = useState('');
const [FirstNameval,setFNameval]=useState(true)

const [LastNameError, setLNameError] = useState('');
const [LastNameval,setLNameval]=useState(true)

const [passwordError, setPasswordError] = useState('');
const [passwordval,setPasswordval]=useState(true)

const [confpasswordError, setconfPasswordError] = useState('');
const [confpasswordval,setconfPasswordval]=useState(true)

const [emailError, setEmailError] = useState('');
const [emailval,setEmailval]=useState(true)

const [phoneError, setPhoneError] = useState('');
const [phoneval,setPhoneval]=useState(true)

const [FormError, setFormError] = useState('');

useEffect(() => {
    usercheck();


}, []);

const removeerror=()=>{
    setError(false)
    setErrormessage('')
    if( localStorage.getItem('role')=='sales associate'){
        navigate('/Profile')
    }
    else{
        navigate('/Login')
    }
    
  }

  const usercheck=()=>{
    if(localStorage.getItem('role')=='admin' ){
        setError(false)
        setErrormessage('')
    }else{
        setError(true)
        setErrormessage('you dont seemed to be properly logged in or dont have necessary please try again')
        
    }
  }

 


const reg =async (event) =>{
    event.preventDefault()


if(Namevalidator() && EmailValidator() && phoneValidator() && passwordValidator() && cnfPasswordValidator() ){
    setFormError("")
    localStorage.setItem("name", FirstName+" "+ LastName);


    try {
        console.log("in try block")
        const response = await fetch("https://sparkle-api.onrender.com/user/createuser", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: Email,name:FirstName+" "+LastName,phone:phone,password:password })
        });
        console.log(response)
        if (!response.ok || response=='') {
          throw new Error('you may be trying to create a duplicate user use different email and phone number');
          setFormError('there is some problem or user with same email or phone number already exists');
        }
        const data = await response.json();
        console.log(data)
       
        
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        setFormError('there is some problem or user with same email or phone number already exists');
      }


    
    
    navigate("/Profile");

}


else{

setFormError("Some invalid values in form")


}
}



const Namevalidator= (event)=>{
    if(!/^[a-zA-Z]+$/.test(FirstName) ){
        setFNameError("Name must be only alphabets")
        setFNameval(false)
        
        return false;
    }
    else if(!/^[a-zA-Z]+$/.test(LastName)){
        setLNameError("Name must be only alphabets")
        setLNameval(false)
        return false;
    }
    else{
        setFNameError("")
        setLNameError("")
        setFNameval(true)
        setLNameval(true)
        return true
    }

}


const EmailValidator= (event)=>{
    if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(Email)){
        setEmailval(false)
        setEmailError("Email is not valid")
        return false;
    }
    else{
        setEmailError("")
        setEmailval(true)
        return true;
    }

}


const passwordValidator= (event)=>{
    if( password=="" || password.length<8 ||  /^[a-zA-Z0-9\s_.-]+$/.test(password)){

        setPasswordval(false)
        setPasswordError('password length should be atleast 8 characters, password must be alphanumeric with special characters')
        
        return false
        
    }
    else{
        setPasswordError('')
        setPasswordval(true)
        
        return true
    }

}

const phoneValidator= (event)=>{
    if(phone.length!=10 ){

        setPhoneval(false)
        setPhoneError('phone length should be  10 characters')
        return false
        
    }
    else{
        setPhoneError('')
        setPhoneval(true)
        return true
    }

}



const cnfPasswordValidator= (event)=>{
    if(password!=confirmpassword){
        setconfPasswordval(false)
        setconfPasswordError("password does not match the confirm password")
        return false
    }
    else{
        setconfPasswordError("")
        setconfPasswordval(true)
        return true;
    }

}



    return(
      
   <div className="containerind">
        {!error &&

                    <form onSubmit={reg}>
                        <div>
                            
                            <div><input type="text" placeholder="First Name" id="name" onChange={(event)=>setFirstName(event.target.value) } style={{ borderColor: FirstNameval ? 'green' : 'red' }}   required></input></div>
                            {FirstNameError && <div style={{ color: 'red' }}>{FirstNameError}</div>}
                            <div><input type="text" placeholder="Last Name" id="phnnumber" onChange={(event)=>setLastName(event.target.value)} style={{ borderColor: LastNameval ? 'green' : 'red' }}  required></input></div>
                            {LastNameError && <div style={{ color: 'red' }}>{LastNameError}</div>}
                            <div><input type="text" placeholder="Email" onChange={(event)=>setEmail(event.target.value)} style={{ borderColor: emailval ? 'green' : 'red' }}  required></input></div>
                            {emailError && <div style={{ color: 'red' }}>{emailError}</div>}
                            <div><input type="text" placeholder="Phone" onChange={(event)=>setPhone(event.target.value)} style={{ borderColor: phoneval ? 'green' : 'red' }}  required></input></div>
                            {phoneError && <div style={{ color: 'red' }}>{phoneError}</div>}
                            <div><input type="password" placeholder="Password" onChange={(event)=>setPassword(event.target.value)} style={{ borderColor: passwordval ? 'green' : 'red' }} required></input></div>
                            { passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
                            <div><input type="password" placeholder="Confirm Password" onChange={(event)=>setConfirmPassword(event.target.value)} style={{ borderColor: confpasswordval ? 'green' : 'red' }} required></input></div>
                            {confpasswordError && <div style={{ color: 'red' }}>{confpasswordError}</div>}

                            
                            {/* <div className="containerind2" ><button type="submit" >Register</button></div> */}
                            <div className="containerind2"><CustomButton label="Register" onclickFunction={reg}></CustomButton></div>

   
      
                        </div>
                        {FormError && <div style={{ color: 'red' }}>{FormError}</div>}
                    </form>
}  <div className='containerind2'>
      {error && <div style={{ color: 'red' }}>{errormessage}</div>}
      {error && <button style={{ color: 'red' }} onClick={removeerror}>ok</button>}
      </div>
                    </div>
                   
                    
              
    )


};

export default Register;

