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
const pdf = require('html-pdf');

let profileImg;
let gitHubUserName;
let userCity;
let userGitHubProfile;
let userBlog;
let userBio;
let userRepositories;
let userFollowers;
let userGHStars;
let userFollowing;


//==============================================
// Inquirer asks for Username and fave color
//==============================================
inquirer
    .prompt([
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
    ])
    .then(function (userInput) {

        const gitHubUser = userInput.username.split(" ").join(" ") + '.json'

        fs.writeFile(
            gitHubUser, JSON.stringify(userInput, null, '\t'), function (err) {
                if (err) {
                    console.log(err);
                }

                console.log("File Saved!");

                //==============================================
                // Sets up URL for main GH API Call
                //==============================================
                const ghURL = "https://api.github.com/users/" + userInput.username;
                console.log(ghURL);
                //==============================================
                // Sets up URL for starred GH API Call
                //==============================================
                const ghStarURL = "https://api.github.com/users/" + userInput.username + "/starred";
                console.log(ghStarURL);

                //==============================================
                // Put URL in function
                //==============================================
                ghAPI(ghURL);
                ghStarAPI(ghStarURL);

            });
    });


function ghAPI(ghURL) {

    axios.get(ghURL)
        .then(function (response) {
            // console.log(response.data);


            let profileImg = (response.data.avatar_url + ".png");
            let gitHubUserName = (response.data.login);
            let userCity = (response.data.location);
            let userGitHubProfile = (response.data.html_url);
            let userBlog = (response.data.blog);
            let userBio = (response.data.bio);
            let userRepositories = (response.data.public_repos);
            let userFollowers = (response.data.followers);
            let userFollowing = (response.data.following);
            // let userGHStars =  Create another axios call for - ;

        });
};

function ghStarAPI(ghStarURL) {

    axios.get(ghStarURL)
        .then(function (responseStars) {
            console.log(responseStars.data.length);
        });
};