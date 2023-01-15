const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();

const url = "http://www.global-isp.org/president/";

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render("home");
})

// About Route
app.get('/about', (req, res) => {
  res.render("about");
})

// Contact Route
app.get('/contact', (req, res) => {
  res.render("contact");
})

app.post('/contact', (req, res) => {
  const contactForm = {
    firstName : req.body.fname,
    lastName : req.body.lname,
    email : req.body.email,
    who : req.body.who,
    nature : req.body.nature,
    message : req.body.message
  }
  console.log(contactForm);

})

app.post('/footer', (req, res)=>{
  const email = req.body.newsletteremail;
  console.log(email);
})


// Publications/Video Route
app.get('/videos', (req, res) => {
  res.render("publications/videos");
})

// Publications/PrintMedia Route
app.get('/printMedia', (req, res) => {
  res.render("publications/printMedia");
})

// Publications/Podcasts Route
app.get('/podcasts', (req, res) => {
  res.render("publications/podcasts");
})

// Publications/AcademicSpace Route
app.get('/academicSpace', (req, res) => {
  res.render("publications/academicSpace");
})

// Publications/TVAppearances Route
app.get('/tvAppearances', (req, res) => {
  res.render("publications/tvAppearances");
})

app.listen(process.env.PORT || 3000, () => {
  console.log("App is live on localhost:3000")
})
