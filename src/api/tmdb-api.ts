import { Movies, MoviesSchema } from "./valibot.js";
import * as v from '../../node_modules/valibot/dist/index.js'
const TMDB_API_KEY = 'bc50218d91157b1ba4f142ef7baaa6a0';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';


/// implement parsing with valibot
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


export async function fetchMovies(page: number): Promise<Movies> {
    try {
        const response = await fetch(`${TMDB_BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`);
        const data = await response.json();
        const { success, output: movies } = v.safeParse(MoviesSchema, data.results);
        if (success) {
            return movies;
        }
        throw new Error("Fetched data does not match Movies schema");

    } catch (error) {
        throw new Error('Error fetching data from TMDB:');
    }
}
