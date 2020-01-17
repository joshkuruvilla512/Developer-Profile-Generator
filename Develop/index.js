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
// Inquirer asks for GHUsername, Color, Location, bio, linkedIn, 
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
