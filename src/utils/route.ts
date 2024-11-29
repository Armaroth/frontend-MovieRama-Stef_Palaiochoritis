const urlPageTitle = "JS Single Page Application Router";
import { fetchNowPlaying, fetchPopular, fetchSearchResults } from "../api/tmdb-api";
import { UrlRoutes } from "./typings";
export const urlRoutes: UrlRoutes = {
    404: {
        heading: `<section class="heading">
            <h1>Page not found:</h1>
        </section>`,
        title: "404 | " + urlPageTitle,
        description: "Page not found",
    },
    '/': {
        heading: `<section class="heading">
            <h1>Now in theaters:</h1>
        </section>`,
        title: "Home | " + urlPageTitle,
        description: '',
        fetchMovies: fetchNowPlaying
    },
    '/search': {
        heading: `<section class="heading">
            <h1>Results for: </h1>
        </section>`,
        title: "Search | " + urlPageTitle,
        description: '',
        fetchMovies: fetchSearchResults
        ,
    },
    '/popular': {
        heading: `<section class="heading">
            <h1>Popular Movies: </h1>
        </section>`,
        title: "Popular | " + urlPageTitle,
        description: '',
        fetchMovies: fetchPopular
    },
};