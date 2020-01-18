//defining const variables
const inquirer = require("inquirer");
const fs = require("fs");
const axios = require('axios').default;
const pdf = require('puppeteer');
const util = require('util');
const writeFileAsync = util.promisify(fs.writeFile);

//==============================================
// Inquirer asks for GHUsername, Color, Location, bio, and linkedIn
//==============================================
function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      message: "Github Username?",
      name: "username"
    },
    {
      type: "rawlist",
      message: "What is your favorite color?",
      name: "color",
      choices: [
        "green",
        "blue",
        "pink",
        "red"
      ]

    },

  ])
    .then(function (response) {
      //Axios call URLS-- these are the queryUrls that the functions use
      const queryUrl = "https://api.github.com/users/" + response.username;
      console.log(queryUrl);

      const queryStarUrl = "https://api.github.com/users/" + response.username + "/starred";
      console.log(queryStarUrl);

      //axios requests 
      //make a request for info based on username // eg: https://api.github.com/users/cml2377
      //log responses to make sure you're getting what you need and it's coming back correctly
      //login
      // const login = res.data.login;
      //avatar_url + .png

      //html_url

      //followers

      //following

      // name,

      //public_repos, 

      //ex: const login = res.data.login;
      //make another request for number of starred repos
      //starred URL


    })
};
promptUser();

