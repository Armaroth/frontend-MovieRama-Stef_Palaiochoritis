import { MoviesSchema } from "./valibot.js";
import * as v from '../../../node_modules/valibot/dist/index.js'
const TMDB_API_KEY = 'bc50218d91157b1ba4f142ef7baaa6a0';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export const genres: { id: number, name: string }[] = await (async function fetchGenres() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}`);
        const data = await response.json();
        const genres = data.genres;
        return genres;
    } catch (error) {
        console.error('Error fetching genres:', error);
    }
})();

console.log('Genres fetched:', genres);

export async function fetchMovies() {
    try {
        const response = await fetch(`${TMDB_BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=1`);
        const data = await response.json();
        const { success, output: movies } = v.safeParse(MoviesSchema, data.results);
        const contentDiv = document.getElementById('content');
        if (success) {
            console.log('now playing', movies.map(movie => movie.genres))
            const movieList = movies.map(movie => {
                return `
          <div class="movie-card">
            <h3>${movie.title}</h3>
            <p>${movie.overview}</p>
            <img src="https://image.tmdb.org/t/p/w500/${movie.posterPath}" alt="${movie.title}" />
          </div>
        `;
            }).join('');
            if (contentDiv) contentDiv.innerHTML = movieList;
        }
    } catch (error) {
        console.error('Error fetching data from TMDB:', error);
    }
}
