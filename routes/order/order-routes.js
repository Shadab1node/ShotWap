let router = require("express").Router();
const auth=require("../../middleware/userAuth")
var Controller = require("../../controller/order/orderController");
router.route("/createorder").post(auth.userloggedIn,Controller.createorder);
router.route("/getallorder").get(Controller.getallorder);
router.route("/updateorder/:id").put(auth.userloggedIn,Controller.updateorder);
router.route("/getorderbyid/:id").get(Controller.getorderbyid);
router.route("/deleteorderbyid/:id").delete(Controller.deleteorderbyid);

module.exports = router;