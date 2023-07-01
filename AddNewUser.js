const express=require('express');
require('./config');
const cors=require('cors')
const Users=require('./Users');
// const Category=require('./Category')
// const FoodList=require('./FoodList');
const {body,validationResult}=require('express-validator')
const app=express();
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const jwtSecret="MadanMohanPant"
const router=express.Router();

app.use(express.json());

app.use(cors());

router.post('/addUser',[
    body('email','please enter correct email').isEmail(),body('name').isLength({min:5}),
    body('password','password must be greater that 5 character').isLength({min:5})
],async(req,resp)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty())
    {
        return resp.status(400).json({errors:errors.array()});
    }
    const salt=await bcrypt.genSalt(9);
    let securePassword=await bcrypt.hash(req.body.password,salt)

     let data=new Users({name:req.body.name,email:req.body.email,password:securePassword});
     await data.save();
    resp.send({userCreated:true});
})
 
module.exports=router;