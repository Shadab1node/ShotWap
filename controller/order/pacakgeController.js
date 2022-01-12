const Package = require("../../model/order/orderpackage");

exports.packageorder = async (req, res) => {
  try {
    const package = new Package();
    package.pickuppincode = req.body.pickuppincode;
    package.destinationpincode = req.body.destinationpincode;
    package.weight = req.body.weight;
    package.dimention = {
      cm:req.body.cm,
      length: req.body.length,
      height: req.body.height,
      width: req.body.width,
    };
    package.save();
    return res.status(200).json({ msg: "Your package has been created",package });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};

exports.getallpackage=async (req,res)=>{
try {
  const  package=await Package.find({}) 
  return res.status(200).json({msg:"successfully fetch all package",package})
  
} catch (error) {
return res.status(400).json({msg:"something went wrong",errors:error})  
}
}

exports.updatepackage=async (req,res)=>{
  try {
    const {pickuppincode,destinationpincode,weight,cm,height,width,length}=req.body;
    const updatepackage=await Package.findByIdAndUpdate(req.params.id,{
      pickuppincode,
      destinationpincode,
      weight,
      cm,
      height,
      width,
      length
    })
    return res.status(200).json({msg:"package update successfully",updatepackage})
  } catch (error) {
    return res.status(400).json({msg:"something went wrong",errors:error})
  }
}

exports.deletepackage=async (req,res)=>{
  try {
    const  deletepackage=await Package.findByIdAndDelete({_id:req.params.id}) 
    return res.status(200).json({msg:"successfully delete  package",deletepackage})
    
  } catch (error) {
  return res.status(400).json({msg:"something went wrong",errors:error})  
  }
  }
