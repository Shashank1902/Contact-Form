require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const mongoose = require("mongoose");

const secret = process.env.SECRET;

const mongoURL = secret;

mongoose.connect(mongoURL, {useNewUrlParser: true,  useUnifiedTopology: true });


const formSchema = new mongoose.Schema ({
    name: String,
    email: String,
    message: String,
    date: String,
});

const Form = mongoose.model("Form", formSchema);



app.get("/", function(req, res) {
    res.sendFile(__dirname +  "/index.html");
});

app.post("/", function(req, res) {

    const getDate = new Date();

    const date = getDate.getDate() + " " + (parseInt(getDate.getMonth()) + parseInt(1)) + " " + getDate.getFullYear();

    const name = req.body.name;
    const email = req.body.email;
    const msg = req.body.message;

    const status = res.statusCode;

    const form = new Form ({
        name: name,
        email: email,
        message: msg,
        date: date,
    });

    form.save();

    if(status === 200) {
    res.sendFile(__dirname +  "/thanks.html");
    } else {
        res.sendFile(__dirname +  "/failed.html")
    }
    
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function()
{
    console.log("Server started on port 3000");
});
