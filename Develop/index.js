//defining const variables
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");
var convertFactory = require("electron-html-to")
const open = require("open");
var path = require("path")

const writeFileAsync = util.promisify(fs.writeFile);
var generateHTML = require("./generateHTML");
//==============================================
// Inquirer asks for GHUsername, Color, Location, bio, and linkedIn
//==============================================
var questions = [
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
  }


];

function start() {
  inquirer.prompt(questions).then(({ username, color }) => {
    console.log(username)
    console.log(color);
    getUserInfo(username, color);
  })
}
function getUserInfo(username, color) {

  axios.get(`https://api.github.com/users/${username}`).then(function (res) {
    //console.log(res)
    // followerCount = res.data.followers
    var data = {
      name: res.data.name,
      bio: res.data.bio,
      profilePic: (res.data.avatar_url + ".jpeg"),
      followers: res.data.followers,
      following: res.data.following,
      location: res.data.location,
      github: res.data.html_url,
      linkedin: res.data.blog,
      publicRepos: res.data.public_repos
    }
    // console.log(data);
    getStarsInfo(username, data, color)


    //console.log("data in api: " +JSON.stringify(data))
  })
  // joshkuruvilla512
}
function getStarsInfo(username, data, color) {
  var starCount
  axios.get(`https://api.github.com/users/${username}/starred`).then(function (res) {
    console.log(res.data[0].stargazers_count)
    var starCount = res.data[0].stargazers_count
    console.log("star count: " + starCount)
    data.star = starCount
    //  console.log(info)
    var html = generateHTML({ username, color, ...data })
    fs.writeFile('newindex.html', html, function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
    const conversion = convertFactory({
      converterPath: convertFactory.converters.PDF
    })
    conversion({ html }, function (err, result) {
      if (err) {
        return console.error(err);
      }

      result.stream.pipe(fs.createWriteStream(path.join(__dirname, "resume.pdf")));
      conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
      open(path.join(process.cwd(), "resume.pdf"))
    });

  })
}


start()
