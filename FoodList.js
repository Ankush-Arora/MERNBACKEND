const mongoose=require('mongoose')

const FoodListSchema=new mongoose.Schema({
    CategoryName:{type:String},
    name:{type:String},
    img:{type:String},
    options: [
        {
           half:{type :Number,default:0},
           full:{type :Number,default:0}
        }
      ],
      description:{type:String}
})

const FoodListModel=mongoose.model('foodList',FoodListSchema)
module.exports=FoodListModel;