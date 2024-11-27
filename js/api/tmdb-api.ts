const TMDB_API_KEY = 'bc50218d91157b1ba4f142ef7baaa6a0';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// export function test() {
//     console.log('TMDB API Key:', TMDB_API_KEY); // Ensure it's loaded correctly
//     console.log('TMDB Base URL:', TMDB_BASE_URL);
//     console.log('fing works');
// }

// Fetch popular movies from the TMDB API
export async function fetchMovies() {
    try {
        const response = await fetch(`${TMDB_BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=1`);
        const data = await response.json();
        console.log('now playing', data.results.map(result => result.title))

        // Display the popular movies on the page
        const contentDiv = document.getElementById('content');
        if (data.results) {
            const movieList = data.results.map(movie => {
                return `
          <div class="movie-card">
            <h3>${movie.title}</h3>
            <p>${movie.overview}</p>
            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}" />
          </div>
        `;
            }).join('');
            contentDiv.innerHTML = movieList; // Insert movie list into the content div
        }
    } catch (error) {
        console.error('Error fetching data from TMDB:', error);
    }
}
// window.onpopstate = fetchPopularMovies;
