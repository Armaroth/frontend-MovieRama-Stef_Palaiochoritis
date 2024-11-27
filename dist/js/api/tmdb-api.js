import { MoviesSchema } from "./valibot.js";
import * as v from '../../../node_modules/valibot/dist/index.js';
const TMDB_API_KEY = 'bc50218d91157b1ba4f142ef7baaa6a0';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
export const genres = await (async function fetchGenres() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}`);
        const data = await response.json();
        const genres = data.genres;
        return genres;
    }
    catch (error) {
        console.error('Error fetching genres:', error);
    }
})();
// console.log('Genres fetched:', genres);
// const renderLoadingScreen = () => {
//     document.innerHtml = 'Loading';
// }
export async function fetchMovies() {
    try {
        // renderLoadingScreen();
        const response = await fetch(`${TMDB_BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=1`);
        const data = await response.json();
        // isLoading = false;
        const { success, output: movies } = v.safeParse(MoviesSchema, data.results);
        const contentDiv = document.getElementById('content');
        if (success) {
            console.log('now playing', movies.map(movie => movie));
            const movieList = movies.map(movie => {
                return `
         <section class="movie-card">
          <section class="image-container" >
          <img src="https://image.tmdb.org/t/p/w500/${movie.posterPath}" alt="${movie.title}" />
          </section>
          <section class="movie-data">
          <h3>${movie.title}</h3>
          <p class="overview">${movie.overview}</p>
          <section class='movie-date'> 
          <span class='attribute'>
            Year:
          </span>
           <span class='value'>
           ${movie.releaseDate.split('-')[0]}</section>
          </span>
          <section>
          <span class='attribute'>
          Genres: 
         </span>
          <span class='value'>
          ${movie.genres.map(genre => ` ${genre?.name}`)}
         </span> 
         </section>
         <section>
          <span class='attribute'>
          Vote average:
         </span>
          <span class='value'>
          ${movie.voteAverage.toFixed(1)}
         </span>
          </section>  
          </section>
          </section>
        `;
            }).join('');
            if (contentDiv)
                contentDiv.innerHTML = contentDiv.innerHTML + movieList;
            // loading screen 
        }
    }
    catch (error) {
        console.error('Error fetching data from TMDB:', error);
    }
}
