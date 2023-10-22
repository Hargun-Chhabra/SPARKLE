/**
 * Author : Hargun Chhabra
 * Banner No : B00899294
 * Email: Hargun.Chhabra@dal.ca
 */


import React, {useState} from "react";

import CustomButton from '../../Components/CustomButton';

import {useNavigate} from "react-router-dom";
function Logout(){
    const navigate=useNavigate();
    const logout =(event)=>{
        event.preventDefault();
       
        localStorage.clear();
        navigate("/");
    }

    const logoutno =(event)=>{
        event.preventDefault();
       
        localStorage.clear();
        navigate("/Profile");
    }



    return(
  
        <div>
    
            <div className="containerind">
                
                <div>
                    <form onSubmit={logout}>
                        <div>
                            <div><h4>Are you Sure You want to logout</h4></div>
                           
                        </div>
                        {/* <div className="containerind2"><button onClick={logout}>Yes</button><button onClick={logoutno}>No</button></div> */}
                        <div className="containerind2"><CustomButton label="Yes" onclickFunction={logout}></CustomButton><CustomButton  label="No" onclickFunction={logoutno}></CustomButton></div>
                    </form>
                </div>
            </div>
            </div>

     
   );


};

export default Logout;