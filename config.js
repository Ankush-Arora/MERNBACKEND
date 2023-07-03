const mongoose = require("mongoose");
// mongoose.connect('mongodb://localhost:27017/foodify')

const DB='mongodb+srv://ankusharora1155:ankush123@cluster0.m5gnngj.mongodb.net/mernstack?retryWrites=true&w=majority'

mongoose.connect(DB).then(()=>{
    console.log('Connected to atlas DB ')
}).catch((err)=>
    console.log(`no connection`))