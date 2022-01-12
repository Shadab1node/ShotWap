let router = require("express").Router();
const userAuth = require("../middleware/userAuth");
var Controller = require("../controller/user/userController");
router.route("/userRegister").post(Controller.userRegister);
router.route("/userlogin", userAuth).post(Controller.userLogin);
router.route("/usermailsend").post(Controller.useremailsend);
router.route("/userforgotpassword").post(Controller.userforgotpassword);
// router.route("/shippo").post(Controller.shippo);

module.exports = router;
