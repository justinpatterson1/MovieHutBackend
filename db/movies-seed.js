// /*

//  PREREQ Install Axios (This is an Http Lib that will allow your backend to send http request to another backend)

//     1. Conntect to MongoDB using Mongoose

//     2.  Send a http (AJAX) request to themoviedb now playing API endpoint

//     3. Get array of movies from the api and then  insert it into your movies collection


// */
 const axios = require('axios');
const movieModel = require("../model/movieModel")
// exports.db = ()=>{

  
//   // .then( response => console.log( response ) )
//   // .catch(err => console.log(err))
//     let u = 1;
//     let title;
//     let poster_path;
//     let backdrop_path;
//     let overview;
//     let vote;
//     let releaseDate;

//     while(u != 10){
//     axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=7dbdc577453d35d0614ab7df17128a43&language=en-US&page=${u}`)
//     .then(function (response) {
//         // handle success
      

       

//         for(let i = 0;i<response.data.results.length;i++){
//           title = response.data.results[i].title
//           poster_path = response.data.results[i].poster_path
//           backdrop_path = response.data.results[i].backdrop_path
//           overview = response.data.results[i].overview
//           vote =  response.data.results[i].vote_average
//           releaseDate = response.data.results[i].release_date
          

//           const genres = [
//             {
//             "id": 28,
//             "name": "Action"
//             },
//             {
//             "id": 12,
//             "name": "Adventure"
//             },
//             {
//             "id": 16,
//             "name": "Animation"
//             },
//             {
//             "id": 35,
//             "name": "Comedy"
//             },
//             {
//             "id": 80,
//             "name": "Crime"
//             },
//             {
//             "id": 99,
//             "name": "Documentary"
//             },
//             {
//             "id": 18,
//             "name": "Drama"
//             },
//             {
//             "id": 10751,
//             "name": "Family"
//             },
//             {
//             "id": 14,
//             "name": "Fantasy"
//             },
//             {
//             "id": 36,
//             "name": "History"
//             },
//             {
//             "id": 27,
//             "name": "Horror"
//             },
//             {
//             "id": 10402,
//             "name": "Music"
//             },
//             {
//             "id": 9648,
//             "name": "Mystery"
//             },
//             {
//             "id": 10749,
//             "name": "Romance"
//             },
//             {
//             "id": 878,
//             "name": "Science Fiction"
//             },
//             {
//             "id": 10770,
//             "name": "TV Movie"
//             },
//             {
//             "id": 53,
//             "name": "Thriller"
//             },
//             {
//             "id": 10752,
//             "name": "War"
//             },
//             {
//             "id": 37,
//             "name": "Western"
//             }
//             ]
//           let movietrailer;
//           let genre = response.data.results[i].genre_ids;
//           let movieGenre = [];

//           for(let x = 0;x<=genre.length;x++){
//             let l = genres.find((g)=>{return g.id === genre[x]})
//             movieGenre.push(l)

//           }

//           console.log("genre:"+genre)
//           console.log( movieGenre)

//           let trailer = "https://www.youtube.com/watch?v="

//           axios.get(`https://api.themoviedb.org/3/${response.data.results[i].id}/videos?api_key=7dbdc577453d35d0614ab7df17128a43&language=en-US`)
//           .then(function (res) {

            
//        movieModel.create({
//         // name: response.data.results[i].name,
//         // img:process.env.BASE_POSTER_IMAGE_DOMAIN+response.data.results[i].poster_path,
//         // poster:process.env.BASE_BACKDROP_IMAGE_DOMAIN+response.data.results[i].backdrop_path,
//         // description:response.data.results[i].overview,
//         // type:"Tv Show",
//         // featured:"false",
//         // genre:movieGenre,
//         // rating:response.data.results[i].vote_average,
//         // release_date:response.data.results[i].first_air_date,
//         // promoted:false,
//         // price:5.99,
//         // rent:1.99,
//         // trailer:movietrailer
//         name:title,
//         img:process.env.BASE_POSTER_IMAGE_DOMAIN+poster_path,
//         poster:process.env.BASE_BACKDROP_IMAGE_DOMAIN+backdrop_path,
//         description:overview,
//         type:"Movie",
//         featured:"false",
//         genre:movieGenre,
//         rating:vote,
//         release_date:releaseDate,
//         promoted:false,
//         price:9.99,
//         rent:5.99,
//         trailer:trailer+res.data.results[0].key
        
// })
//             // handle success
//             console.log(res);
//           })
//           .catch(function (error) {
//             // handle error
//             console.log(error);
//           })
//           .then(function () {
//             // always executed
//           });
      
      
      
         
         
//         i++
//     }

   
 
//     console.log("Success")
//       })
//       .catch(function (error) {
//         // handle error
//         console.log(error);
//       })
//       .then(function () {
//         // always executed
//       });
//       u++
//     }

// }
async  function axis(){
  const arr =[]
  let i = 1;
  while (i <= 10){
    const a = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=7dbdc577453d35d0614ab7df17128a43&language=en-US&page=${i}`)
     arr.push(a)
     i++
  }

  return arr
  console.log(arr)

}

async function getTrailer(x){
  const t =  await axios.get(`https://api.themoviedb.org/3/tv/${x}/videos?api_key=7dbdc577453d35d0614ab7df17128a43&language=en-US`)
  return t
}

exports.db=()=>{
  const genres = [
                  {
                  "id": 28,
                  "name": "Action"
                  },
                  {
                  "id": 12,
                  "name": "Adventure"
                  },
                  {
                  "id": 16,
                  "name": "Animation"
                  },
                  {
                  "id": 35,
                  "name": "Comedy"
                  },
                  {
                  "id": 80,
                  "name": "Crime"
                  },
                  {
                  "id": 99,
                  "name": "Documentary"
                  },
                  {
                  "id": 18,
                  "name": "Drama"
                  },
                  {
                  "id": 10751,
                  "name": "Family"
                  },
                  {
                  "id": 14,
                  "name": "Fantasy"
                  },
                  {
                  "id": 36,
                  "name": "History"
                  },
                  {
                  "id": 27,
                  "name": "Horror"
                  },
                  {
                  "id": 10402,
                  "name": "Music"
                  },
                  {
                  "id": 9648,
                  "name": "Mystery"
                  },
                  {
                  "id": 10749,
                  "name": "Romance"
                  },
                  {
                  "id": 878,
                  "name": "Science Fiction"
                  },
                  {
                  "id": 10770,
                  "name": "TV Movie"
                  },
                  {
                  "id": 53,
                  "name": "Thriller"
                  },
                  {
                  "id": 10752,
                  "name": "War"
                  },
                  {
                  "id": 37,
                  "name": "Western"
                  }
                ]
                
                        
  let t = 'https://www.youtube.com/embed/'
  
  axis()
  .then(res=>{
   
    let k = 0
    
    
      for(let i = 0;i < res[7].data.results.length;i++){
        let movieGenre = [];
        let name = res[7].data.results[i].name
        let img = res[7].data.results[i].poster_path
        let overview = res[7].data.results[i].overview
        let vote = res[7].data.results[i].vote_average
        let release = res[7].data.results[i].first_air_date
        let back = res[7].data.results[i].backdrop_path
        let genre = res[7].data.results[i].genre_ids;
  
        for(let x = 0;x<=genre.length;x++){
          let l = genres.find((g)=>{return g.id === genre[x]})
          movieGenre.push(l)
  
        }
  
        console.log(res[0].data.results[i].id)
        if(res[0].data.results[i].id != 'null'){
          
          getTrailer(res[0].data.results[i].id)
          .then(trailer => {
            if(trailer.data.results[0]){
              
                movieModel.create({
                  name:name,
                  img:process.env.BASE_POSTER_IMAGE_DOMAIN+img,
                  poster:process.env.BASE_BACKDROP_IMAGE_DOMAIN+back,
                  description:overview,
                  type:"Tv Show",
                  featured:"false",
                  rating:vote,
                  release_date:release,
                  promoted:false,
                  price:9.99,
                  rent:5.99,
                  trailer:t+trailer.data.results[0].key,
                  genre:movieGenre
              
             })
              
            }
            else{
              movieModel.create({
                name:name,
                img:process.env.BASE_POSTER_IMAGE_DOMAIN+img,
                poster:process.env.BASE_BACKDROP_IMAGE_DOMAIN+back,
                description:overview,
                type:"Tv Show",
                featured:"false",
                rating:vote,
                release_date:release,
                promoted:false,
                price:9.99,
                rent:5.99,
                trailer:null,
                genre:movieGenre
            
           })
            }
          
            // movieModel.create({
            //   name:name,
            //   img:process.env.BASE_POSTER_IMAGE_DOMAIN+img,
            //   poster:process.env.BASE_BACKDROP_IMAGE_DOMAIN+back,
            //   description:overview,
            //   type:"Tv Show",
            //   featured:"false",
            //   rating:vote,
            //   release_date:release,
            //   promoted:false,
            //   price:9.99,
            //   rent:5.99,
            //   trailer:t+trailer.data.results[0].key,
            //   genre:movieGenre
              
            //  })
            
          })
    
        }
       
          
      
            }

           
            
    
    
  })
}





