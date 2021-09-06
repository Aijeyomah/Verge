const express = require("express");
const bodyParser = require("body-parser");
const courier = require("./dbroute")

let app = express();
 let port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.listen(port, ()=>{
    console.log("Application listening on port", port)
});
app.use("/api/v1", courier);


module.exports = app