//defining const variables
const inquirer = require("inquirer");
const fs = require("fs");
const axios = require('axios').default;
const pdf = require('puppeteer');
const util = require('util');
const writeFileAsync = util.promisify(fs.writeFile);
const generateHTML = require("./generateHTML");
//==============================================
// Inquirer asks for GHUsername, Color, Location, bio, and linkedIn
//==============================================
inquirer.prompt([
  {
    type: "input",
    message: "Github Username?",
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

  },
]).then(function (userInput) {

  const userName = userInput.username;
  const userColor = userInput.color;

  const queryURL = `https://api.github.com/users/${userName}`;
  console.log(userName);

  //generateHTML(userInput) is calling the function from generateHTML.js 
  //   const generateHTML = generateHTML(userColor);
  //   console.log(generateHTML);

});

//Axios calls
function githubInfo(queryURL) {
  return axios.get(queryURL)
    .then(function (response) {
      //log responses to make sure you're getting what you need and it's coming back correctly
      //login
      const login = response.data.login;
      //avatar_url + .png
      const avatar = response.data.avatar_url + ".png";
      //html_url
      const html = response.data.html_url;
      //followers
      const followers = response.data.followers;
      //following
      const following = response.data.following;
      // name
      const name = response.data.name;
      //public_repos, 
      const repo = response.data.public_repos;
      //starred URL
      const starred = response.data.starred_url;
    })
}

const queryStarsURL = "https://api.github.com/users/" + userName + "/starred";
// console.log(queryStarUrl);

function githubStarsInfo(queryStarsURL) {
  return axios.get(queryStarsURL)
    .then(function (responseStars) {

      return responseStars.data.length;
      console.log(responseStars.data.length);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
};       
