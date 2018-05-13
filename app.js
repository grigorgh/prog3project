var express = require("./express");
var app = express();

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.redirect("puplic/index.html");
});

app.listen(3000, function () {
    console.log("Example is running on port 3000");
});
var eater = require("./class/Eater");
var grass = require("./class/grass");
var grasseater = require("./class/GrassEater");
var men = require("./class/Men");
var women = require("./class/Women")
