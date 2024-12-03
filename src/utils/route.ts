const urlPageTitle = "MovieRama";
import { fetchNowPlaying, fetchSearchResults } from "../api/tmdb-api";
import { UrlRoutes } from "./typings";
import { extractSearchTerm } from "./utils";
export const urlRoutes: UrlRoutes = {
    '/': {
        renderHeading: () => {
            const headerSection = document.getElementById('header');
            if (!headerSection) {
                throw new Error('App is not properly Rendered. Cannot find header Section')
            }
            headerSection.innerHTML = `
            <h1>Now in theaters: </h1>
            `},
        title: "Home | " + urlPageTitle,
        description: '',
        fetchMovies: fetchNowPlaying
    },
    '/search': {
        renderHeading: () => {
            const query = extractSearchTerm();
            const headerSection = document.getElementById('header');
            if (!headerSection) {
                throw new Error('App is not properly Rendered. Cannot find header Section')
            }
            headerSection.innerHTML = `
                <h1>Results for: ${query} </h1>
                `},
        title: "Search | " + urlPageTitle,
        description: '',
        fetchMovies: fetchSearchResults

    },
    // 404: {
    //     renderHeading: () => {
    //         const headerSection = document.getElementById('header');
    //         if (!headerSection) {
    //             throw new Error('App is not properly Rendered. Cannot find header Section')
    //         }
    //         headerSection.innerHTML = `
    //                     <h1>Page not found:</h1>
    //                 `},
    //     title: "404 | " + urlPageTitle,
    //     description: "Page not found",
    // },
};