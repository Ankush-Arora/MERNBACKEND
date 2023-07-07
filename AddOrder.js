const express=require('express');
const router=express.Router();
const Order=require('./Orders')
const cors=require('cors')
const app=express();
const jwt=require('jsonwebtoken')
const jwtSecret="MadanMohanPant"

app.use(cors());
router.post('/newOrder',async (req,resp)=>{

    console.log('In new Order line 1')
    let data=req.body.order_data
    await data.splice(0, 0, {Order_date:req.body.order_date})

    //if email not exist in db then create else insert many
    let eId=await Order.findOne({'email':req.body.email})
    // console.log('First line ',eId);

    if((eId === null))
    {
                    try{
                    await Order.create({
                        email:req.body.email,
                        order_data:[data]
                    }).then(()=>{
                        resp.json({success:true})
                    })
                        } 
                        catch(error)
                        {
                            console.error(error.message);
                            resp.send({data:"Not found"});
                        }
    }
        else
        {
            console.log('second line ',eId);
                    try{
                        await Order.findOneAndUpdate({
                            email:req.body.email
                        },{$push:{order_data:data}}).then(()=>{
                            resp.json({success:true})
                        })
                        }
                    catch(error)
                        {
                            console.error(error.message);
                            resp.send("Server Error");
                        }
        }
})

router.post('/myOrders',verifyToken,async(req,resp)=>{

    try{
            let myData=await Order.findOne({"email":req.body.email})
            resp.json({orderData:myData});
    }
    catch(error)
    {
        resp.send("Server error",error.message)
    }

})

function verifyToken(req,resp,next)
{
    let token=req.headers['authorization'];
    console.log("Verify",token)
    if(token)
    {
        jwt.verify(token,jwtSecret,(err,valid)=>{
            if(err)
            {
                resp.status(401).send({result:"Invalid token"})
            }
            else 
            {
                next();
            }
        })
    }
    else{
            resp.status(403).send({result:"Please add token with header"})
    }
}
module.exports=router;