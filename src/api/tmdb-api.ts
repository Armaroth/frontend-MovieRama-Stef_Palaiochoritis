import { MoviesSchema } from "./valibot.js";
import * as v from 'valibot'
import { TMDB_API_KEY, TMDB_BASE_URL } from "./constants.js";
import { Movies } from "../utils/typings.js";
import { renderLoadingScreen } from "../utils/views.js";

export const genres: { id: number, name: string }[] = await (async function fetchGenres() {
    /// maybe implement parsing with valibot
    try {
        const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}`);
        const data = await response.json();
        const genres = data.genres;
        return genres;
    } catch (error) {
        console.error('Error fetching genres:', error);
    }
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
    window.scrollTo({
        top: 0,
        behavior: 'auto',
    });
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
export async function fetchPopular(page: number): Promise<Movies> {
    try {
        renderLoadingScreen(true);
        const response = await fetch(`${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`);
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

export async function fetchModalInfo(movieId: number): Promise<Movies> {
    try {
        const response = await fetch(`${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&append_to_response=videos,reviews,similar`);
        const data = await response.json();
        const { success, output: movies } = v.safeParse(MoviesSchema, data.results);
        if (success) {
            return movies;
        }
        return [];
    } catch (error) {
        throw new Error('Error fetching data from TMDB:');
    }
}