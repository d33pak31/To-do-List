const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
 
const app = express();
 
app.set("view engine", "ejs");
 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
 
// CONNECT TO DATABASE
mongoose.connect("mongodb+srv://deepak312000:Deepak312000@cluster0.qnbtnpq.mongodb.net/?retryWrites=true&w=majority", { dbName: "todoDB" })
.then(function() {
    console.log("Connected succesfully to atlas");
})
.catch(function(){
    console.log("Database connection faild");
});
 
// CREATE SCHEMA
const itemsSchema = {
    name: String
};
 
// CREATE MODEL
const Item = mongoose.model("Item", itemsSchema);
 
const item1 = new Item({
    name: "Welcome to your todolist!"
});
 
const item2 = new Item({
    name: "Hit the + button to add a new item."
});
 
const item3 = new Item({
    name: "<-- Hit this to delete an item."
});
 
const defaultItems = [item1, item2, item3];
 
app.get("/", function (req, res) {
 
    Item.find({})
    .then(function(foundItems) {
        
        if(foundItems.length === 0){
            
            Item.insertMany(defaultItems)
            .then(function() {
                console.log("Insert succesfull");
                res.redirect("/");
            })
            .catch(function(err) {
                console.log(err);
            });
            // res.redirect("/");
 
        }else{
            res.render("list", {listTitle: "Today", newListItems: foundItems});
        }
 
    })
    .catch(function(err) {
        console.log(err);
    });
 
});

app.post('/', (req, res) => {
  const { newItem } = req.body;
   const item = new Item({ name: newItem });
   item
     .save()
     .then((item) => console.log(item))
     .catch((err) => console.log(err));
  res.redirect('/');
});

app.post('/delete', (req, res) => {
  const checkedItemId = req.body.checkbox;
  Item.findByIdAndRemove(checkedItemId)
    .then(function () {
      console.log("successfully deleted checked item");
      res.redirect('/');
    })
    .catch(function (err) {
      console.log(err);
    });

  // res.redirect('/');
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
