/*

 PREREQ Install Axios (This is an Http Lib that will allow your backend to send http request to another backend)

    1. Conntect to MongoDB using Mongoose

    2.  Send a http (AJAX) request to themoviedb now playing API endpoint

    3. Get array of movies from the api and then  insert it into your movies collection


*/
const axios = require('axios');
const movieModel = require("../model/movieModel")
exports.db = ()=>{

    let u = 1;
    while(u != 8){
    axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=7dbdc577453d35d0614ab7df17128a43&language=en-US&page=${u}`)
    .then(function (response) {
        // handle success
        console.log();
        let x = 0;

        for(let i = 0;i<response.data.results.length;i++){
        movieModel.create({
                name: response.data.results[i].name,
                img:process.env.BASE_POSTER_IMAGE_DOMAIN+response.data.results[i].poster_path,
                poster:process.env.BASE_BACKDROP_IMAGE_DOMAIN+response.data.results[i].backdrop_path,
                description:response.data.results[i].overview,
                type:"Tv Show",
                featured:"false",
               // genre:"action",
                rating:response.data.results[i].vote_average,
                release_date:response.data.results[i].first_air_date,
                promoted:false,
                price:5.99
        })
        i++
    }
 
    console.log("Success")
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
      u++
    }
}



