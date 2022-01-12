const mongoose=require("mongoose")
const Schema=mongoose.Schema

const ItemSchema=new Schema(
    {
        itemname:{
            type:String,
            required:true
        },
        quantity:{
            type:String,
            required:true
        },
        sku:{
            type:String,
        },
        weight:{
            type:String,
        },
        value:{
            type:String,
        }
    },
    {
        timestamps:true,
    }
    )

    var Item=mongoose.model("item",ItemSchema)
    module.exports=Item