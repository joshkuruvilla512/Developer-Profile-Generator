const axios =require("axios");


const api ={
    getStars(username){
        var starCount;
        axios.get("https://api.github.com/users/joshkuruvilla512/starred").then(function(res){
            console.log(res[0])
            starCount = res[0].stargazers_count
            //console.log(res[0].stargazers_count)
        })
        return starCount;
    },
    getUsers(username){
        var data = {
            followers: '',
            following: '',
            publicRepos: ''
        };
        return axios.get("https://api.github.com/users/joshkuruvilla512").then(function(res){
            //console.log(res)
            followerCount = res.data.followers
             data = {
                followers: res.data.followers,
                following: res.data.following,
                publicRepos : res.data.public_repos
            }
            console.log("data in api: " +JSON.stringify(data))
            return data
        })
        
    }
}
module.exports = api;