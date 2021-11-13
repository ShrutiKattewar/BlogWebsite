//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent = "Looking for tech blogs to keep up with the latest technology trends? No worries! Your search ends here! Read on… People from different walks of life are intrigued by the way technology is progressing at a profuse rate, shaping our lives into the digital world! With new tech trends being introduced every quarter and information becoming obsolete as technology evolves, it’s now an obligation to stay relevant and learn about the newest technologies, digital industry, social media, and the web in general!"

const aboutContent = "As Ever since the industrial revolution, technology has played a huge role in everyday life. It has made life better, safer. Today, technology is also dictating terms in the business world and has made strong headway into all the major industries. So, if you want to succeed in life, you should get a good education and make an excellent career in any of the trending technologies of 2020-21. So, Every day we are going to know about new technologies.";
const contactContent = "Contact Us At: "
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://shruti-kattewar:Shrkat0@cluster0.ko1ly.mongodb.net/blogDB", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
