

require("dotenv").config();

const express= require("express");
const bodyParser =require("body-parser");
const mongoose = require('mongoose');
const mongooseSerial = require("mongoose-serial");
const _ = require("lodash");




const app=express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
// app.use(express.static(__dirname));



mongoose.connect("mongodb+srv://selakoti-shubham:SezPiMuKste8WtIe@riders-database.xecvk.mongodb.net/ridersDB");


app.get("/", function(req, res) {
    res.render("home");
});




const riderSchema = new mongoose.Schema ({

    serialNumber:{
        type: String,
    },
    riderName:{
        type: String,
    },
    riderEmail: {
        type: String,
        required :[true]
    },
    riderAge: Number,
    riderPhone:Number,
    riderPro: String
});

const Rider = mongoose.model("Rider", riderSchema);


app.post("/", function(req, res){

    const riderName = _.capitalize(req.body.riderName);
   
    const riderEmail = _.capitalize( req.body.riderEmail);
    // console.log(riderEmail);
    
    
    const riderAge = req.body.riderAge;
    const riderPhone= req.body.riderPhone;
    const riderPro = req.body.riderPro;

    
    // console.log("HELLO");
    // console.log(riderName);
    // console.log(riderEmail);
    // console.log(riderAge);
    // console.log(riderPro);

   
        const rider = new Rider ({
            riderName: riderName,
            riderEmail: riderEmail,
            riderAge: riderAge,
            riderPhone: riderPhone,
            riderPro: riderPro
        });

            Rider.exists({riderEmail: riderEmail}, function (err, isAlready) {
                if (err){
                    console.log(err)
                    res.redirect("/");
                }else{
                    console.log(isAlready);
                    if(isAlready === null)
                    {
                        rider.save();
                        res.redirect("/");       
                    }
                    else
                    {
                        console.log("Already Exist");
                        res.redirect("/");
                    }
                }

            });  

});


let port = process.env.PORT;
if(port==null || port=="")
{
    port=3000;
}

app.listen(port, function() {
    console.log("Server started on port");
  });