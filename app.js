const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://Shashank1902:shashankdb@cluster0.zxive.mongodb.net/formDB", {useNewUrlParser: true,  useUnifiedTopology: true });

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

    const form = new Form ({
        name: name,
        email: email,
        message: msg,
        date: date,
    });

    // form.save();

    console.log(name);
    console.log(email);
    console.log(msg);
    console.log(date);

    res.sendFile(__dirname +  "/thanks.html");
    
});

app.listen(3000, function()
{
    console.log("Server started on port 3000");
});
