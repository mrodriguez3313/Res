const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');
const port = 8080;

mongoose.connect("mongodb://localhost:27017/todolistDB", { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });

// Schema initializations
var itemsSchema = {
  name: {
    type: String,
    required: true
  }
};
var Item = mongoose.model("Item", itemsSchema);


const ListSchema = {
  name: String,
  items: [itemsSchema]
};
const List = mongoose.model("List", ListSchema);

// Default items
const listItem1 = new Item({
  name: "shopping"
});

const listItem2 = new Item({
  name:"Hit plus button to add a new item"
});

const listItem3 = new Item({
  name: "<-- Hit check box to delete item"
});

const defaultItems = [listItem1, listItem2, listItem3];



// GET Methods
app.get("/", function(req, res){
  var today = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric'};
  var currentDay = today.toLocaleDateString('en-US', options);
  var day = currentDay;


  Item.find({}, function(err, foundItems){
    // console.log(foundItems);
    if (foundItems.length === 0){
      Item.insertMany(defaultItems, function(err){
        if(err){
          console.log(err);
        } else {
          console.log("Successfully inserted many to Item collection");
        }
      });
      res.redirect("/");
    } else {
      res.render("index", {kindofDay: day, listName: "Main", list:foundItems});
     }
  })
});

app.get("/:customList", function(req, res){
  var today = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric'};
  var currentDay = today.toLocaleDateString('en-US', options);
  var day = currentDay;
  const customListName = req.params.customList;
  // console.log(customListName);
  List.findOne({name: customListName}, function(err, foundList){
    if (!err) {
      if(!foundList){
        // create new list
        const list = new List({
          name: customListName,
          items: defaultItems
        });
        list.save();
        console.log("created");
        res.redirect("/"+customListName);
      } else {
        // show existing list
        console.log("Exists");
        res.render("index", {kindofDay: day, listName: foundList.name, list: foundList.items})
      }
  }
  });
});

// POST Methods
app.post("/", function(req, res){
  var itemName = req.body.item;
  var listName = req.body.list;
  const item = new Item({
    name: itemName
  });
  if (listName === "Today"){
    item.save();
    res.redirect("/");
  } else {
    List.findOne({name: listName}, function(err, foundList) {
      foundList.items.push(item);
      foundList.save();
      res.redirect("/"+ listName);
    } );
  }
  // console.log("button works");
  // console.log("User input: " + itemName);
});

app.post("/delete", function(req, res){
  const checkedBox = req.body.checkbox;
  Item.findByIdAndRemove(checkedBox, function(err){
    if (err){
      console.log(err);
    } else {
      console.log("Successfully deleted " + checkedBox);
    }
  });
  res.redirect("/");
})

app.listen(port, function(){
  console.log("server running on port " + port)
});
