import { ExpandedMovieSchema, GenresSchema, MoviesSchema } from "./valibot.js";
import * as v from 'valibot'
import { ExpandedMovie, Genres, Movies } from "../utils/typings.js";
import { renderLoadingScreen } from "../utils/views.js";
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
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
export async function fetchNowPlaying(page: number): Promise<Movies> {
    try {
        renderLoadingScreen(true);
        const response = await fetch(`${TMDB_BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`);
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
export async function fetchSearchResults(page: number): Promise<Movies> {
    const inputComponent = document.getElementById('search') as HTMLInputElement;
    const query: string = inputComponent.value;
    try {
        renderLoadingScreen(true);
        const response = await fetch(`${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page}`);
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