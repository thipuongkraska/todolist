const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
/////////////////////
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
///const arraydulieu = ["an uong", "ngu nghi", "di choi"];
const conclusion = "Hoc xong roi!";
//////////////KET NOI VOI DATABASE
const url = "mongodb://localhost:27017/newDatabaseName";
mongoose.connect(url, {
  useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,

});
////-> databa nay dung de lam gi? Kiem tra ket noi toi database
const databa = mongoose.connection;
databa.on("open", () => console.log("connected to mongodb"));

//////////////////TAO SCHEMA, COLLECTION VA OPERATION
const newSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
});

const Activity = mongoose.model("Activity", newSchema);

////////////////////
app.get("/", async function(req,res) {

  ///res.render("index", {dulieu: arraydulieu, loiket: conclusion});///day la phan gianh cho ejs
  const postDulieu = await Activity.find({});  ///du lieu tra ve la mot array
  res.render("index", {dulieu: postDulieu, loiket: conclusion});

});

app.post("/", async function(req,res) {
  const newActivity = new Activity({name: req.body.nhapdulieu});
  await newActivity.save();
  res.redirect("/");
});
 app.post("/delete", async function(req,res) {
   const ten = req.body.ten;
   console.log(ten);
   await Activity.findOneAndRemove({name: ten});
   res.redirect("/");
 })




///app.post("/", (req,res) => {
  ///const newData = req.body.nhapdulieu;
  ///console.log(newData);
  ///console.log(req.body.ten)
  ///arraydulieu.push(newData);
  ///res.redirect("/");
///}); --Phan nay gianh cho ejs


app.listen(3000, function() {
  console.log("app is listening");
});
