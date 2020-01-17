// const questions = [

// ];

// function writeToFile(fileName, data) {

// }

// function init() {

// init();


//  BREAK //

const inquirer = require("inquirer");
const fs = require("fs");
const axios = require('axios').default;
const pdf = require('puppeteer');

const writeFileAsync = util.promisify(fs.writeFile);

//==============================================
// Inquirer asks for GHUsername, Color, Location, bio, and linkedIn
//==============================================
function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            message: "GitHub Username?",
            name: "username"
        },
        {
            type: "list",
            message: "What is your favorite color?",
            choices: [
                "green",
                "blue",
                "pink",
                "red"
            ],
            name: "color"
        },
        {
            type: "input",
            message: "Where are you from?",
            name: "loc"
        },
        {
            type: "input",
            message: "What do you like to do around Austin?",
            name: "bio"
        },
        {
            type: "input",
            message: "What is your linkedin url?",
            name: "linkedin"
        }

    ]);
}
function generateHTML(answers) {
    return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <title>Document</title>
  </head>
  <body>
    <div class="jumbotron jumbotron-fluid">
    <div class="container">
      <h1 class="display-4">Hi! My name is ${answers.username}</h1>
      <p class="lead">I am from ${answers.loc}.</p>
      <h3>Example heading <span class="badge badge-secondary">Contact Me</span></h3>
      <ul class="list-group">
        <li class="list-group-item">My GitHub username is ${answers.github}</li>
        <li class="list-group-item">LinkedIn: ${answers.linkedin}</li>
      </ul>
    </div>
  </div>
  </body>
  </html>`;
  }
