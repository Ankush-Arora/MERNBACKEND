const express=require('express');
require('./config');
const cors=require('cors')
const Users=require('./Users');
const Category=require('./Category')
const FoodList=require('./FoodList');
const {body,validationResult}=require('express-validator')
const app=express();
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const jwtSecret="MadanMohanPant"
 
const addNewUser=require('./AddNewUser')
const router=express.Router();
 

app.use(express.json());

app.use(cors());
<<<<<<< HEAD


app.post('/addUser',[
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
=======
 
app.use('/',require("./AddOrder"));
app.use('/',require("./AddNewUser"));
//or
// app.post('/addUser',[
//     body('email','please enter correct email').isEmail(),body('name').isLength({min:5}),
//     body('password','password must be greater that 5 character').isLength({min:5})
// ],async(req,resp)=>{


//     const errors=validationResult(req)
//     if(!errors.isEmpty())
//     {
//         return resp.status(400).json({errors:errors.array()});
//     }
//     const salt=await bcrypt.genSalt(9);
//     let securePassword=await bcrypt.hash(req.body.password,salt)

//      let data=new Users({name:req.body.name,email:req.body.email,password:securePassword});
//      await data.save();
//     resp.send({userCreated:true});
// })
>>>>>>> 6fa41d7 (Some new Api added)

app.use('/',require("./AddOrder"));
app.use('/',require("./AddNewUser"));
//or
// app.post('/addUser',[
//     body('email','please enter correct email').isEmail(),body('name').isLength({min:5}),
//     body('password','password must be greater that 5 character').isLength({min:5})
// ],async(req,resp)=>{


//     const errors=validationResult(req)
//     if(!errors.isEmpty())
//     {
//         return resp.status(400).json({errors:errors.array()});
//     }
//     const salt=await bcrypt.genSalt(9);
//     let securePassword=await bcrypt.hash(req.body.password,salt)

//      let data=new Users({name:req.body.name,email:req.body.email,password:securePassword});
//      await data.save();
//     resp.send({userCreated:true});
// })
 

app.post('/addCategory',async (req,resp)=>{
    let newCategory=new Category(req.body);
    await newCategory.save();
   resp.send(req.body)
})



app.post('/userLogin',[
    body('email','please enter correct email').isEmail(),
    body('password','password must be greater that 5 character').isLength({min:5})
],async (req,resp)=>{
     let email=req.body.email;

     const errors=validationResult(req)
    if(!errors.isEmpty())
    {
        return resp.status(400).json({errors:errors.array()});
    }
    try{
            let userData=await Users.findOne({email})

            if(!userData){
                return resp.status(400).json({errors:"Try login with correct credentials"})
            }

            const passwordCompare=await bcrypt.compare(req.body.password,userData.password)
            if(!passwordCompare)
            {
                return resp.status(400).json({errors:"Try login with correct credentials"})
            }

            const data={
                user:{
                    id:userData.id
                }
            }
            const authToken=jwt.sign(data,jwtSecret)
            return resp.json({authToken:authToken,success:true,userLogin:'successfully'})
    }
    catch(error)
    {
        console.log(error);
        resp.json({success:false})
    }
})

app.delete('/delete/:_id',async (req,resp)=>{
     let deletedData=await Category.deleteOne(req.params)
   resp.send(deletedData)
})

app.put('/update/:_id',async (req,resp)=>{
    let deletedData=await Category.updateOne(
        req.params,
        {
            $set:req.body
        }
    )
  resp.send(deletedData)
})

app.get('/getUsers',async (req,resp)=>{
    let data=await Users.find();
    resp.send(data);
})

app.get('/getCategory',async (req,resp)=>{
    let data=await Category.find();
    resp.send(data);
})

app.post('/addFood',async (req,resp)=>{
     let newFood=new FoodList(req.body)
    await newFood.save();
   resp.send(req.body);
})

app.get('/getFoodList',async (req,resp)=>{
    let data=await FoodList.find();
    resp.send(data);
})


// if(process.env.NODE_ENV == "production")
// {
//     app.use(express.static("MERN-master/build"))
// }

  app.listen(process.env.PORT || 3001)
// app.listen(3001)





















// const mongoose = require("mongoose");
//   mongoose.connect('mongodb://localhost:27017/foodify')
// const addUser = async () => {
//     const userSchema = new mongoose.Schema({
//         name: { type: String, required: true },
//         email: { type: String, required: true },
//         password: { type: String, required: true }
//     })
//     const UserModel = mongoose.model('users', userSchema)

//     const data = new UserModel({

//         name:"Anand Negi",
//         email:"anand@gmail.com",
//         password:"anand123"
//     })

//     let result=await data.save();
//     console.log(result);
   
// }
// //addUser();

// const findInDb=async ()=>{

//     const userSchema = new mongoose.Schema({
//         name: { type: String, required: true },
//         email: { type: String, required: true },
//         password: { type: String, required: true }
//     })

//     const User=mongoose.model('users',userSchema)
//     let data=await User.find({name:'Avdesh Pant'});
//     console.log(data);
// }
// findInDb();