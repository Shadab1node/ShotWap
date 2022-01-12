const Order = require("../../model/order/orderModel");

exports.createorder = async (req, res) => {
  try {
    const order = new Order();
    order.userId = req.body.userId;
    order.warehouse = req.body.warehouse;
    order.address = req.body.address;
    order.orderId = req.body.orderId;
    order.date = req.body.date;
    order.ordertype = req.body.ordertype;
    order.mobilenumber = req.body.mobilenumber;
    order.alternatemobilenumber = req.body.alternatemobilenumber;
    order.parceltype = {
        b2c20kgbelow:req.body.b2c20kgbelow,
        b2c20kgabove: req.body.b2c20kgabove,
    };
    order.dimension = {
        length:req.body.length,
        width: req.body.width,
        height: req.body.height,
        totalweight: req.body.totalweight,
    };
    order.packageinfoId = req.body.packageinfoId;
    order.save();
    return res.status(200).json({ msg: "Your order has been created",order });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};

exports.getallorder=async (req,res)=>{
 try {
  const getallorder=await Order.find({})
  return res.status(200).json({msg:"order get successfully",getallorder})
 } catch (error) {
  return res.status(500).json({error:error.msg})
 }
}


exports.updateorder=async (req,res)=>{
  try {
    const {warehouse,address,orderId,date,ordertype,mobilenumber,alternatemobilenumber,b2c20kgbelow,b2c20kgabove,length,width,height,totalweight}=req.body
   const updateorder=await Order.findByIdAndUpdate(req.params.id,{
    warehouse,
    address,
    orderId,
    date,
    ordertype,
    mobilenumber,
    alternatemobilenumber,
    b2c20kgbelow,
    b2c20kgabove,
    length,
    width,
    height,
    totalweight
   })
   return res.status(200).json({msg:"order update successfully",updateorder})
  } catch (error) {
   return res.status(500).json({error:error.msg})
  }
 }

 exports.getorderbyid=async (req,res)=>{
  try {
    const getorderbyid=await Order.findById({_id:req.params.id})
    return res.status(200).json({msg:"order get by id successfully",getorderbyid})
   } catch (error) {
    return res.status(500).json({error:error.msg})
   }
 }

 exports.deleteorderbyid=async (req,res)=>{
  try {
    const deleteorderbyid=await Order.deleteOne({_id:req.params.id})
    return res.status(200).json({msg:"order get by id successfully",deleteorderbyid})
   } catch (error) {
    return res.status(500).json({error:error.msg})
   }
 }