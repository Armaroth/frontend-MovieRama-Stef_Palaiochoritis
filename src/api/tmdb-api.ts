import * as v from 'valibot'
import { ExpandedMovieSchema, GenresSchema, MoviesSchema } from "./valibot.js";
import { ExpandedMovie, Genres, Movies } from "../utils/typings.js";
import { renderLoadingScreen } from "../utils/views.js";
import { extractCurrentPage, extractSearchTerm } from '../utils/utils.js';
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

//fetches all movie genres from tmdb so that they can be used in the data tranformation of movies
//see     /src/api/valibot line 19
export const genres: Genres = await (async function fetchGenres() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}`);
        const data = await response.json();
        const { output: genres, success } = v.safeParse(GenresSchema, data.genres)
        if (success) return genres;
        else return [];
    } catch (error) {
        console.error('Error fetching genres:', error);
        return []
    };
})();

// fetches the movies now playing in theaters
export async function fetchNowPlaying(): Promise<Movies> {
    const currentPage = extractCurrentPage();
    try {
        renderLoadingScreen(true);
        const response = await fetch(`${TMDB_BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=${currentPage}`);
        const data = await response.json();
        const { success, output: movies } = v.safeParse(MoviesSchema, data.results);
        if (success) {
            return movies;
        }
        return [];
    } catch (error) {
        throw new Error('Error fetching data from TMDB:');
    } finally {
        renderLoadingScreen(false);
    }
}
// fetches the movies corresponding to the user input
export async function fetchSearchResults(): Promise<Movies> {
    const currentPage = extractCurrentPage();
    const query = extractSearchTerm();
    try {
        renderLoadingScreen(true);
        const response = await fetch(`${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${currentPage}`);
        const data = await response.json();
        const { success, output: movies } = v.safeParse(MoviesSchema, data.results);
        if (success) {
            return movies;

        }
        return [];
    } catch (error) {
        throw new Error('Error fetching data from TMDB:');
    } finally {
        renderLoadingScreen(false);
    }
}
// fetches a selected movies details
export async function fetchMovieDetails(movieId: string | number): Promise<ExpandedMovie | null> {
    try {
        const response = await fetch(`${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&append_to_response=videos,reviews,similar`);
        const data = await response.json();
        const { success, output: movies } = v.safeParse(ExpandedMovieSchema, data);
        if (success) {
            return movies;
        }
        return null;
    } catch (error) {
        throw new Error('Error fetching data from TMDB:');
    }
}