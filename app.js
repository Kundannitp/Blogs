const express=require("express");
const bodyParser=require("body-parser");
const mongoose =require("mongoose");

mongoose.connect("mongodb+srv://Kundan2000:Kundan2000@@k2j-ebqyx.mongodb.net/BlogsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const BlogsSchema=new mongoose.Schema({
    posttitle:String,
    post:String,
    linkto:String
});

var Blogs1=mongoose.model('Blogs',BlogsSchema);

const app=express();
var posts=new Array();
var posttitle=new Array();
var linkto=new Array();
var posttitledata="";
var postsdata="";
posts.push("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.");
// posttitle.push("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.");
posttitle.push("Day1");
linkto.push("http://www.google.com");
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

Blogs1.find(function (err, blogsarr) {
    if (err) {
        console.log(err);
    } else {
        for (var i = 0; i < blogsarr.length; i++) {
            posttitle.push(blogsarr[i].posttitle);
            posts.push(blogsarr[i].post);
            linkto.push(blogsarr[i].linkto);
        }
    }
});

app.get("/",function(req,res){
    res.render("home", { css: 'home', heading:posttitle,posts:posts,route:linkto});
});
app.get("/About",function(req,res){
    res.render('About');
});
app.get("/Contact", function (req, res) {
    res.render('Contact');
});
app.get("/compose",function(req,res){
    res.render('compose',{css:'compose'});
});
app.post("/compose",function(req,res){
    posttitledata=req.body.posttitles;
    postsdata=req.body.posts1;
    const blog=new Blogs1({
        posttitle:posttitledata,
        post:postsdata,
        linkto: '/' + posttitledata
    });
    blog.save();

    posttitle.push(posttitledata);
    posts.push(postsdata);
    linkto.push('/' + posttitledata);

    res.redirect('/');
});
app.get('/Day1',function(req,res){
    res.render('post',{css:post,Title:posttitledata,posts:postsdata});
});
app.get('/Day2', function (req, res) {
    res.render('post', {
        css: 'post',
        Title: posttitledata,
        posts: postsdata
    });
});
app.get('/Test', function (req, res) {
    res.render('post', {
        css: 'post',
        Title: posttitledata,
        posts: postsdata
    });
});
app.get('/New Post', function (req, res) {
    res.render('post', {
        css: 'post',
        Title: posttitledata,
        posts: postsdata
    });
});
app.listen(process.env.PORT || 4000, function () {
    console.log("app started at 4000 port");
});