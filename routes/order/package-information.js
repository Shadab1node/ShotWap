let router = require("express").Router();
var Controller = require("../../controller/order/packageIController");
router.route("/itempackage").post(Controller.itempackage);
router.route("/itemgetall").get(Controller.getallpackageinformation);
router.route("/itempackageupdate/:id").put(Controller.itempackageupdate);
router.route("/itempackagedelete/:id").delete(Controller.itempackagedelete);

module.exports = router;