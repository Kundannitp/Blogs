const express=require("express");
const bodyParser=require("body-parser");
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
    console.log(posttitledata);
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