//defining const variables
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);
//==============================================
// Inquirer asks for GHUsername, Color, Location, bio, and linkedIn
//==============================================
function start() {


  inquirer.prompt(
    [
      {
      type: "input",
      message: "What is your Github Username?",
      name: "username"

    },
    {
      type: "list",
      message: "What is your favorite color?",
      name: "color",
      choices: [
        "green",
        "blue",
        "pink",
        "red"
      ]
    }, {
      type: "input",
      message: "Where are you from?(Name a City and State)",
      name: "location"
    }, {
      type: "input",
      message: "What is your LinkedIn URL?",
      name: "linkedin"
    }
    ]
  );
};
start();

function generateHTML(answers) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <title>09-Node</title>
</head>
<body>
  <div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-4">Hi! My name is ${answers.name}</h1>
    <p class="lead">I am from ${answers.location}.</p>
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

start()
  .then(function(answers) {
    const html = generateHTML(answers);

    return writeFileAsync("index.html", html);
  })
  .then(function() {
    console.log("Successfully wrote to index.html");
  })
  .catch(function(err) {
    console.log(err);
  });
