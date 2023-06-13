const express = require('express');
const ejs = require('ejs');
// const axios = require('axios'); // Automation of articles not required!!
const bodyParser = require('body-parser');
const { google } = require('googleapis');
const app = express();
const keyFile = require('./credentials.json');
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

// AnshuSarda Spreadsheet: 1uqwdN34AZpALS_FtPuy7F-6-D7yalJYo-pgB6t4T3xk
// localHost Spreadsheet: 1DyJcYBLujaZSYEgCx1N-Qweny_-vv4vPbCXl4DQ4iiU
const spreadsheetId = '1uqwdN34AZpALS_FtPuy7F-6-D7yalJYo-pgB6t4T3xk';
const jwtClient = new google.auth.JWT(
  keyFile.client_email,
  null,
  keyFile.private_key,
  ['https://www.googleapis.com/auth/spreadsheets'],
);

// const contactForm = {
//   firstName : req.body.fname,
//   lastName : req.body.lname,
//   email : req.body.email,
//   who : req.body.who,
//   nature : req.body.nature,
//   message : req.body.message
// }

app.post('/contact', async (req, res) => {
  try {
    await jwtClient.authorize();

    const sheets = google.sheets({ version: 'v4', auth: jwtClient });

    // Append the form data to the Google Sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'ContactForm',
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: [[req.body.fname, req.body.lname, req.body.email, req.body.who, req.body.nature, req.body.message]],
      },
    });
    res.status(200).render('success', {type:'contact information'});
  } catch (error) {
    console.log(error);
    res.status(500).render('failure', {type:'contact information'});
  }
});


app.post('/footer', async (req, res) => {
  try {
    await jwtClient.authorize();

    const sheets = google.sheets({ version: 'v4', auth: jwtClient });

    // Append the form data to the Google Sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'EmailList',
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: [[req.body.newsletteremail]],
      },
    });

    res.status(200).render('success', {type:'email address'});
  } catch (error) {
    console.log(error);
    res.status(500).render('failure', {type:'email address'});
  }
});


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
