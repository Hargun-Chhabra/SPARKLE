// This code is an adpatation of code provided in the gitrepo: https://github.com/CodeWithHarry/iNotebook-React/tree/master/backend/routes provided by codewitharry

const express= require("express");
const router=express.Router();
const User =require("../models/Usermanagementmodel");
const bcrypt=require('bcryptjs');
const jsonaouthtoken=require('jsonwebtoken');
const e = require("express");
const JWT_SECRET="hello"




// endpoint to create user
router.post("/createuser",async (req,res)=>{
const salt = await bcrypt.genSalt(10);

// console.log(req.body);

req.body.password=await bcrypt.hash(req.body.password,salt)

const user=await User.create({name:req.body.name, email:req.body.email,phone:req.body.phone,password:req.body.password,role:"sales associate"});

res.send({name:req.body.name, email:req.body.email,phone:req.body.phone,password:req.body.password,role:"sales associate"});

}
)




//login user
router.post("/login",async (req,res)=>{
    const salt = await bcrypt.genSalt(10);
    
    // console.log(req.body);
    const {email,password}=req.body
    
    try{
        let user =await User.findOne({email})
        // checking that user exists or not
        if(!user){
            res.status(400).json({error:"something wrong with credentials"});
        }
        const passwordcomapre= await bcrypt.compare(password,user.password)
        //function to compare cryptic text generated earlier for password with the users entered password
        if(!passwordcomapre){
            res.status(400).json({error:"something wrong with credentials"});
        }
        // using id to make an jwt authentication token which will be used in other parts of code
        const data={
            user:{
                id:(await user).id
            }
        }
            const authtoken=jsonaouthtoken.sign(data,JWT_SECRET);
            
            // console.log(authtoken);
           
            res.send({token:authtoken});
    }catch(error){
        console.log(error)
    } 
    }
    )

// loggedin user details
router.post('/getdetail', async (req,res)=>{
    try{
        const token =req.body.authtoken;
        console.log(token)
        const decoded =await jsonaouthtoken.verify(token, JWT_SECRET);
        const getuser=decoded.user
        console.log(getuser.id)
        const userid=getuser.id;
        const user= await User.findById(userid).select("-password");
        res.send(user)
    }
    catch(error){
        console.log(error)
        res.status(500).send("something wen very wrong")
    }

})

// user details
router.post('/getuserdetail', async (req,res)=>{
    try{
        const email =req.body.email;
        const user= await User.findOne({email}).select("-password");
        res.send(user)
    }
    catch(error){
        console.log(error)
        res.status(500).send("something wen very wrong")
    }

})


// all user details for admin
// 
router.post('/getalluser', async (req,res)=>{

    try{
        const token =req.body.authtoken;
        console.log(token)
        const decoded =await jsonaouthtoken.verify(token, JWT_SECRET);
        const getuser=decoded.user
        console.log(getuser.id)
        const userid=getuser.id;
        const user= await User.findById(userid).select("-password");
        // res.send(user)
        if(user.role=='admin'){
            try{
                const userlist=await User.find({});
                res.status(200).send(userlist)
            }catch(error){
                console.log(error)
                res.status(500).send("some error occured while fetching the lis") 
            }
        }
        else{
            res.status(400).send("permission not allowed")
        }
    }
    catch(error){
        console.log(error)
        res.status(500).send("something wen very wrong")
    }


})


//update a user
router.put("/updateuser",async (req,res)=>{
    try{
        const token =req.body.authtoken;
        console.log(token)
        const decoded =await jsonaouthtoken.verify(token, JWT_SECRET);
        const getuser=decoded.user
        console.log(getuser.id)
        const userid=getuser.id;
        const user= await User.findById(userid).select("-password");
        // res.send(user)
        if(user.role=='admin'){
            try{
            if((!req.body.password && req.body.email!=user.email) ){
            const filter = { email: req.body.email };
            const update = req.body.updatepayload;
            
            
            const doc = await User.findOneAndUpdate(filter, update, {
            returnOriginal: false
            
            });
            res.send({message:"updated"})
        }else{
            res.status(400).send("not allowed to update yourself or another admin as an admin yourself please contact support");
        }
            }catch(error){
                console.log(error)
                res.status(500).send("some error occured while updating please contact customer support") 
            }
        }
        else{
            res.status(400).send("permission not allowed")
        }
    }
    catch(error){
        console.log(error)
        res.status(500).send("something is wrong call customer support")
    }
  
})



//delete a user
router.delete("/delete",async (req,res)=>{
    try{
        const token =req.body.authtoken;
        console.log(token)
        const decoded =await jsonaouthtoken.verify(token, JWT_SECRET);
        const getuser=decoded.user
        console.log(getuser.id)
        const userid=getuser.id;
        const user= await User.findById(userid).select("-password");
        // res.send(user)
        if(user.role=='admin'){
            console.log("check1")
            try{
            if(user.email!=req.body.email ){
                console.log("check2")
            const filter = { email: req.body.email };
            console.log("check3")
            const doc = await User.deleteOne(filter);
            console.log("check4")
            res.status(200).send({"message": "deleted"})
           
        }else{
            console.log("check5")
            res.status(400).send("not allowed to delete yourself as an admin");
        }
            }catch(error){
                console.log("check6")
                console.log(error)
                res.status(500).send("some error occured while delteing please contact customer support") 
            }
        }
        else{
            console.log("check7")
            res.status(400).send("permission not allowed")
        }
    }
    catch(error){
        console.log(error)
        res.status(500).send("something is wrong call customer support")
    }
  
   
   
})


module.exports=router
