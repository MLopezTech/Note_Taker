
const express = require("express");
const fs = require("fs");


var application = express();
var portUsed = process.env.portUsed || 8080


application.use(express.urlencoded({ extended: true }));
application.use(express.json());
application.use("/assets", express.static("./assets"));


require("./routing/html-routes")(application);
require("./routing/api-routes")(application);


application.listen(portUsed, function() {
    console.log("application listening on portUsed " + portUsed);
});
