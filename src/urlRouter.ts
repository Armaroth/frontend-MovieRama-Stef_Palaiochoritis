import { setIsFetching } from "./state.js";
import { urlRoutes } from "./utils/route.js";
import { RouteKeys } from "./utils/typings.js";
import { extractCurrentPage, loadMoviesPage, renderPage, resetParams } from "./utils/utils.js";

// handles any changes on the url path or params change
async function urlLocationHandler() {
    const page = extractCurrentPage();
    let location: string = window.location.pathname
    const route = urlRoutes[location as RouteKeys];
    route.renderHeading();
    document.title = route.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', route.description);
    setIsFetching(true);
    const movies = await route.fetchMovies();
    page === '1' ? renderPage(movies) : loadMoviesPage(movies);
}
// pushes the url path to the window history and calls the function to handle any changes
export function navigateTo(path: URL) {
    window.history.pushState({}, '', path);
    urlLocationHandler();
}

//initiates  the application
(async () => {
    window.scrollTo({ top: 0 });
    window.onpopstate = urlLocationHandler;
    resetParams();
    urlLocationHandler();
})();
