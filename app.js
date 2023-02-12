const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.set('strictQuery',false);
mongoose.connect("mongodb://127.0.0.1:27017/wikiDB", { useNewUrlParser: true });

const articleSchema = new mongoose.Schema({
  title : String,
  content : String
});

const Article = mongoose.model("Article",articleSchema);

app.get("/articles",function(req,res){
    Article.find(function(err,foundArticles){
        if(err)
        console.log(err);
        else
        console.log(foundArticles);
    })
})


app.post("/articles",function(req,res){

    const article = new Article({
        title : req.body.title,
        content : req.body.content
    })

    /*article.save(function(err){
        if(err)
        console.log(err);
        else
        console.log("Successfully added a new article");
    });*/
})

/*app.delete("/articles",function(req,res){
    Article.deleteMany(function(err){
        if(!err)
        console.log("Successfully deleted articles from database");
        else
        console.log(err);
    })
})*/

app.get("/articles/:uni",function(req,res){
    Article.findOne({title:req.params.uni},function(err,foundArticle){
        if(!err)
        console.log(foundArticle);
        else
        console.log(err);
    })
})

/*app.put("/articles/:uni",function(req,res){
    Article.updateOne(
        {title:req.params.uni},
        {title:req.body.title,content:req.body.content},
        {upsert: true},
        function(err){
            if(!err)
            console.log("Succesfully updated requested article");
        })
})*/


app.patch("/articles/:uni",function(req,res){
    Article.updateOne(
        {title:req.params.uni},
        {$set:req.body},
        function(err){
            if(!err)
            console.log("Succesfully updated requested article");
            else
            console.log(err);
        })
})

app.delete("/articles/:uni",function(req,res){
    Article.deleteOne({title:req.params.uni},function(err){
        if(!err)
        console.log("Successfully deleted article from database");
        else
        console.log(err);
    })
})


app.listen(3000, function() {
  console.log("Server started on port 3000");
});