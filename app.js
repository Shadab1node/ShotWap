require("./Config/database");
require("dotenv").config();
let express = require("express");
let bodyParser = require("body-parser");
const cors = require("cors");
let app = express();
app.use(
  cors({
    origin: "*",
  })
);
let apiRoutes = require("./routes/userRoutes");
let packageOrderRoutes=require("./routes/order/package-order-routes")
let packageInformation=require("./routes/order/package-information")
let orderRoutes=require("./routes/order/order-routes")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 5000;
app.use("/api",
 apiRoutes,
 orderRoutes,
 packageOrderRoutes,
 packageInformation,
 
 );
app.listen(port, function () {
  console.log("Running on port " + port);
});
module.exports = app;
