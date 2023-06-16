const movieGrid = document.getElementById("movies-grid");
const moviesContainer = document.getElementById("movies-container");
const loadMoreBtn = document.getElementById("load-more-movies-btn");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("close-search-btn");
const modal = document.getElementById("modal");
const modalContent = document.querySelector(".modal-content");


let currentPage = 1;
const API_KEY = "40667d0d347b9fc651121941b1e7d758";
let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${currentPage}`;

const fetchData = async () => {
  try {
    const response = await fetch(`${url}`);
    const data = await response.json();
    const movies = data.results;

    movies.forEach((movie) => {
      const movieCard = document.createElement("div");
      movieCard.classList.add("movie-card");

      const img = document.createElement("img");
      img.classList.add("movie-poster");
      img.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
      img.alt = movie.title;

      const title = document.createElement("div");
      title.classList.add("movie-title")
      title.textContent = movie.title;
      title.setAttribute("title",movie.title)

      const votes = document.createElement("p");
      votes.classList.add("movie-votes")
      votes.textContent = `  ⭐️ ${movie.vote_average.toFixed(1)} `;

      movieCard.appendChild(img);
      movieCard.appendChild(title);
      movieCard.appendChild(votes);
      movieGrid.appendChild(movieCard);

      movieCard.addEventListener("click", () => {
        showMovieDetails(movie);
      })
    });

    if (data.page < data.total_pages) {
      loadMoreBtn.style.display = "block";
    } else {
      loadMoreBtn.style.display = "none";
    }
  } catch (error) {
    console.log(error);
  }
};


const searchMovies = async (event) => {
    event.preventDefault();
  
    const searchTerm = searchInput.value.trim();
  
    if (searchTerm === '') {
      return;
    }
  
    movieGrid.innerHTML = '';
    currentPage = 1;
    url = `https://api.themoviedb.org/3/search/movie?api_key=40667d0d347b9fc651121941b1e7d758&query=${searchTerm}`;
    await fetchData();

    if (currentPage < totalPages) {
        loadMoreBtn.style.display = "block";
      }

    console.log("yayyy working");
  };
  
  const handleSearch = async (event) => {
    if (event.keyCode === 13) {
      searchMovies(event);
    }
  };

const loadMoreMovies = () => {
    currentPage++;
    if (searchInput.value.trim() === '') {
      // Load more movies from the "now_playing" category
      url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${currentPage}`;
    } else {
      // Load more movies related to the search
      url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchInput.value.trim()}&page=${currentPage}`;
    }
  
    fetchData();
  };

const clearResults = () => {
  movieGrid.innerHTML = "";
  currentPage = 1;
  url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${currentPage}`;
  fetchData();

  searchInput.value = "";
};

loadMoreBtn.addEventListener("click", loadMoreMovies);
searchBtn.addEventListener("click", searchMovies);
searchInput.addEventListener("keydown", handleSearch);
clearBtn.addEventListener("click", clearResults);

window.addEventListener("load", (event) => {
  event.preventDefault();
  fetchData();
});


function showMovieDetails(movie){
  const message = `Title: ${movie.title}\n\nOveriew: ${movie.overview}`;
  alert(message);
}

//https://api.themoviedb.org/3/movie/now_playing?api_key=40667d0d347b9fc651121941b1e7d758&q="movies"`;