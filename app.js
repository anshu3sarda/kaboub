const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();


const port = 3000 || process.env.PORT;

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

// Recent Events Route
// app.get('/futureEvents', (req, res) => {
//   res.render("futureEvents");
// })

// Publications/Video Route
app.get('/videos', (req, res) => {
  res.render("publications/videos");
})

// Publications/PrintMedia Route
app.get('/printMedia', (req, res) => {
  axios("http://www.global-isp.org/president/")
  .then(response => {
  const html = response.data;
  const $ = cheerio.load(html)
  const articles = []
  // 
      $('ul:nth-child(8) > li', html).each(function () {
      const title = $(this).text()
      const source = $(this).find('em').text()
      const url = $(this).find('a').attr('href')
      articles.push({
          title: title,
          source: source,
          url : url,
      });
      })
      res.render("publications/printMedia",{articles: articles, title: articles.title, source: articles.source , url: articles.url});
  }).catch(err => console.log(err));
})

// Publications/Podcasts Route
app.get('/podcasts', (req, res) => {
  axios("http://www.global-isp.org/president/")
  .then(response => {
  const html = response.data;
  const $ = cheerio.load(html)
  const articles = []
  // 
      $('ul:nth-child(12) > li', html).each(function () {
        const title = $(this).text()
        const source = $(this).find('em').text()
        const url = $(this).find('a').attr('href')
        articles.push({
            title: title,
            source: source,
            url : url,
        });
      })
      res.render("publications/podcasts",{articles: articles, title: articles.title, source: articles.source , url: articles.url});
  }).catch(err => console.log(err));
})

// Publications/Blog Route
app.get('/blog', (req, res) => {
  res.render("publications/blog");
})

// Publications/AcademicSpace Route
app.get('/academicSpace', (req, res) => {
  axios("http://www.global-isp.org/president/")
    .then(response => {
    const html = response.data;
    const $ = cheerio.load(html)
    const articles = []

        $('#page-content ul:first > li', html).each(function () {
          const title = $(this).text()
          const source = $(this).find('em').text()
          const url = $(this).find('a').attr('href')
          articles.push({
              title: title,
              source: source,
              url : url,
          });
        })
        res.render("publications/academicSpace",{articles: articles, title: articles.title, source: articles.source , url: articles.url});
    }).catch(err => console.log(err));
})

// Publications/TVAppearances Route
app.get('/tvAppearances', (req, res) => {
  axios("http://www.global-isp.org/president/")
  .then(response => {
  const html = response.data;
  const $ = cheerio.load(html)
  const articles = []
  // 
      $('ul:nth-child(10) > li', html).each(function () {
        const title = $(this).text()
        const source = $(this).find('em').text()
        const url = $(this).find('a').attr('href')
        articles.push({
            title: title,
            source: source,
            url : url,
        });
      })
      res.render("publications/tvAppearances",{articles: articles, title: articles.title, source: articles.source , url: articles.url});
  }).catch(err => console.log(err));
})

app.listen(port || process.env.PORT, () => {
  console.log(`App is live on localhost:${port}`)
})
