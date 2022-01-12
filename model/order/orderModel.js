const mongoose=require("mongoose")
const Schema=mongoose.Schema

const orderSchema=new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "profile",
            required:true
          },
          warehouse:{
              type:String,
              required:true
          },
          address:{
              type:String,
              required:true
          },
          orderId:{
              type:String,
              required:true
          },
          date:{
              type:String,
              required:true
          },
          ordertype:{
              type:String,
              required:true
          },
          mobilenumber:{
              type:Number,
              required:true
          },
          alternatemobilenumber:{
              type:Number,
              required:true
          },
          parceltype: {
            type: [
              {
                b2c20kgbelow: {
                  type: String,
                  default:null
                },
                b2c20kgabove:{
                    type:String,
                    default:null
                },
              },
            ],
          },
          packageinfoId: {
            type: Schema.Types.ObjectId,
            ref: "item",
            required:true
          },
          dimension: {
            type: [
              {
                length: {
                  type: String,
                },
                width:{
                    type:String,
                },
                height:{
                    type:String
                },
                totalweight:{
                    type:String
                }
              },
            ],
          },
    },
    {
        timestamps:true,
    }
    )

    var Order=mongoose.model("order",orderSchema)
    module.exports=Order