const Item=require("../../model/order/pakageIModel")

exports.itempackage=async (req,res)=>{
    try {
        const item=new Item()
        item.itemname=req.body.itemname;
        item.quantity=req.body.quantity;
        item.sku=req.body.sku;
        item.weight=req.body.weight;
        item.value=req.body.value;
        item.save()
        return res.status(200).json({msg:"package information add successfully",item})
    } catch (error) {
        return res.status(400).json({msg:"something went wrong",error:error.message})
    }
}

exports.getallpackageinformation=async (req,res)=>{
    try {
        const getallpackageinformation=await Item.find({})
        return res.status(200).json({msg:"package information fetch successfully",getallpackageinformation})
    } catch (error) {
        return res.status(400).json({msg:"something went wrong",error:error.message})
    }
}


exports.itempackageupdate=async (req,res)=>{
    try {
      const {weight,value,sku,quantity,itemname}=req.body;
      const updatepackage=await Item.findByIdAndUpdate(req.params.id,{
        itemname,
        weight,
        value,
        sku,
        quantity,
      })
      return res.status(200).json({msg:"package information update successfully",updatepackage})
    } catch (error) {
      return res.status(400).json({msg:"something went wrong",errors:error})
    }
  }

  exports.itempackagedelete=async (req,res)=>{
    try {
      const  itempackagedelete=await Item.findByIdAndDelete({_id:req.params.id}) 
      return res.status(200).json({msg:"successfully delete  package",itempackagedelete})
      
    } catch (error) {
    return res.status(400).json({msg:"something went wrong",errors:error})  
    }
    }