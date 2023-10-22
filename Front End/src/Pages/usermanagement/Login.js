/**
 * Author : Hargun Chhabra
 * Banner No : B00899294
 * Email: Hargun.Chhabra@dal.ca
 */

// The code was reffered from the code in [React + Axios - HTTP POST Request Examples](https://jasonwatmore.com/post/2020/07/17/react-axios-http-post-request-examples) 

import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import CustomButton from '../../Components/CustomButton';
import axios from 'axios';
function Login(){


const [isToggled, setIsToggled] = useState(false);
localStorage.setItem("isToggled",isToggled);
// setIsToggled(false);
const [Email,setEmail]=useState("");
const [password,setPassword]=useState("");
const navigate=useNavigate();
localStorage.setItem("Email",Email);
const [error,setError]=useState(false);
const [errorMessage,setErrorMessage]=useState('');




const log_in =async (event) =>{
   


await axios.post(`https://sparkle-api.onrender.com/user/login`, { email:Email,password:password })
      .then(res => {
        localStorage.setItem('authtoken',res.data.token);
        navigate("/Profile");
      
      }).catch((error)=>{
        setError(true)
        setErrorMessage('Wrong credentials please try again or call admin or support')
      })
}


const removeerror=()=>{
    setError(false)
    setErrorMessage('')
  }

  


    return(
  
        <div>
    
            <div className="containerind">
                
                <div>
                    <form onSubmit={log_in}>
                        <div>
                            <div><input type="email" placeholder="Email" onChange={(event)=>setEmail(event.target.value)}  required></input></div>
                            <div><input type="password" placeholder="Password" onChange={(event)=>setPassword(event.target.value)} required></input></div>
                        </div>
                        {/* <div className="containerind2"><button type="submit">Login</button></div> */}
                        <div className="containerind2"><CustomButton type="submit" label="Login" onclickFunction={log_in}></CustomButton>
                      
                        </div>
                      
                    </form>
                    
                </div>
                {error && <div style={{ color: 'red' }}>{errorMessage}</div>}
                        {error && <button style={{ color: 'red' }} onClick={removeerror}>ok</button>}
            </div>
            
              
           
            </div>
            
     
   );


};

export default Login;
