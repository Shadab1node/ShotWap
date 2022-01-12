let router = require("express").Router();
var Controller = require("../../controller/order/pacakgeController");
router.route("/packageorder").post(Controller.packageorder);
router.route("/getallpackage").get(Controller.getallpackage);
router.route("/updatepackage/:id").put(Controller.updatepackage);
router.route("/deletepackage/:id").delete(Controller.deletepackage);

module.exports = router;
