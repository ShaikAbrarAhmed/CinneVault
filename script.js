const API_KEY = '86196e194d379035e9b074a3ef17e75a';
const BASE_URL = 'https://api.themoviedb.org/3';

const searchBox = document.getElementById('searchBox');
const searchButton = document.getElementById('searchButton');
const languageSelect = document.getElementById('languageSelect');
const movieContainer = document.querySelector('.movies-grid');

const modal = document.getElementById('movieModal');
const closeBtn = document.querySelector('.close');
const modalPoster = document.getElementById('modalPoster');
const modalTitle = document.getElementById('modalTitle');
const modalOverview = document.getElementById('modalOverview');
const modalRating = document.getElementById('modalRating');
const modalRelease = document.getElementById('modalRelease');
const modalGenre = document.getElementById('modalGenre');
const trailerButton = document.getElementById('trailerButton');


// Fetch popular movies
async function fetchRandomMovies() {
    const url = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayMovies(data.results.slice(0, 20));
    } catch (err) {
        console.error(err);
    }
}

// Fetch search results
async function fetchMovies(query) {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayMovies(data.results);
    } catch (err) {
        console.error(err);
    }
}

// Fetch by language
async function fetchMoviesByLanguage(lang) {
    const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=${lang}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayMovies(data.results);
    } catch (err) {
        console.error(err);
    }
}

// Display movies
function displayMovies(movies) {
    movieContainer.innerHTML = ""; 
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>⭐ ${movie.vote_average}</p>
        `;

        movieCard.addEventListener("click", () => openModal(movie));

        movieContainer.appendChild(movieCard);
    });
}

// Open modal
function openModal(movie) {
    modal.style.display = "flex";
    modalPoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    modalTitle.textContent = movie.title;
    modalOverview.textContent = movie.overview;
    modalRating.textContent = movie.vote_average;
    modalRelease.textContent = movie.release_date;
    modalGenre.textContent = movie.genre_ids.join(', '); // genre mapping optional
    trailerButton.href = `https://www.youtube.com/results?search_query=${movie.title}+trailer`;
}

// Close modal
closeBtn.addEventListener('click', () => {
    modal.style.display = "none";
});

window.addEventListener('click', (e) => {
    if (e.target == modal) {
        modal.style.display = "none";
    }
});

// Event listeners
searchButton.addEventListener('click', () => fetchMovies(searchBox.value));
searchBox.addEventListener('keypress', (e) => { if (e.key === "Enter") fetchMovies(searchBox.value); });
languageSelect.addEventListener('change', () => fetchMoviesByLanguage(languageSelect.value));

// Load on page
window.addEventListener('load', fetchRandomMovies);
