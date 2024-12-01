const urlPageTitle = "JS Single Page Application Router";
import { fetchNowPlaying, fetchPopular, fetchSearchResults } from "../api/tmdb-api";
import { UrlRoutes } from "./typings";
export const urlRoutes: UrlRoutes = {
    404: {
        heading: `
            <h1>Page not found:</h1>
        `,
        title: "404 | " + urlPageTitle,
        description: "Page not found",
    },
    '/': {
        heading: `
            <h1>Now in theaters:</h1>
        `,
        title: "Home | " + urlPageTitle,
        description: '',
        fetchMovies: fetchNowPlaying
    },
    '/search': {
        heading: `
            <h1>Results for: </h1>
        `,
        title: "Search | " + urlPageTitle,
        description: '',
        fetchMovies: fetchSearchResults
        ,
    },
    '/popular': {
        heading: `
            <h1>Popular Movies: </h1>
        `,
        title: "Popular | " + urlPageTitle,
        description: '',
        fetchMovies: fetchPopular
    },
};