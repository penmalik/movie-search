let movieSearchBox = document.getElementById('movie-search-box');
let searchList = document.getElementById('search-list');
let resultGrid = document.getElementById('result-grid');

// load movies from API
async function loadMovies(searchTerm){
    const URL = `https://www.omdbapi.com/?s=${searchTerm}&apikey=31628cf6`;
    let res = await fetch(`${URL}`);
    let data = await res.json();
    // console.log(data.Search);
    if (data.Response == "True") displayMovieList(data.Search);
}

function findMovies() {
    let searchTerm = (movieSearchBox.value).trim();
    if (searchTerm.length > 0) {
        searchList.classList.remove("hide-search-list");
        loadMovies(searchTerm);
    }else{
        searchList.classList.add("hide-search-list");
    }
}

function displayMovieList(movies) {
    searchList.innerHTML = "";
    for (let i = 0; i < movies.length; i++) {
        let movieListItem = document.createElement("div");
        movieListItem.dataset.id = movies[i].imdbID;
        // setting movie id in data-id
        movieListItem.classList.add('search-list-item');
        if (movies[i].Poster != "N/A")
            moviePoster = movies[i].Poster;
        else
            moviePoster = "image_not_found.png";


        movieListItem.innerHTML = `
            <div class="search-item-thumbnail">
            <img src="${moviePoster}" alt=""></div>
            <div class="search-item-info">
            <h3>${movies[i].Title}</h3>
            <p> ${movies[i].Year} </p>
            </div>
        `;
        searchList.appendChild(movieListItem);
    }
    loadMovieDetails();
}

function loadMovieDetails() {
    let searchListMovies = searchList.querySelectorAll(".search-list-item");
    searchListMovies.forEach(movie => {
        movie.addEventListener("click", async() => {
            // console.log(movie.dataset.id);
            searchList.classList.add('hide-search-list');
            movieSearchBox.value = "";
            let result = await fetch(`https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=31628cf6`);
            let movieDetails = await result.json();
            // console.log(movieDetails);
            displayMovieDetails(movieDetails);
        })
    }); 
}

function  displayMovieDetails(details) {
    resultGrid.innerHTML = `
    <div class="movie-poster">
                        <img src="${(details.Poster != "N/A") ? details.Poster: "image_not_found.png"}" alt="Movie poster">
                    </div>
                    <div class="movie-info">
                        <h3 class="movie-title">
                            ${details.Title}
                        </h3>
                        <ul class="movie-misc-info">
                            <li class="year">Year: ${details.Year}</li>
                            <li class="rated">Rated: ${details.Rated}</li>
                            <li class="released">Released: ${details.Released}</li>
                        </ul>
                        <p class="genre"><b>Genre:</b> ${details.Genre}</p>
                        <p class="writer"><b>Writer:</b>  ${details.Writer}</p>
                        <p class="actors"><b>Actors:</b> ${details.Actors}</p>
                        <p class="plot"><b>Plot:</b> ${details.Plot}</p>
                        <p class="language"> <b>Language:</b> ${details.Language}</p>
                        <p class="awards"> <b> Awards:</b> ${details.Awards}</p>
                    </div>
    `;
}



window.addEventListener("click", (event) => {
    if (event.target.classname != "form-control") {
        searchList.classList.add("hide-search-list");
    }
})



let num1 = "5";
let num2 = "3";

var answer = num1 <<= num2;
console.log(answer);