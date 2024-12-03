import { setIsFetching } from "./state.js";
import { urlRoutes } from "./utils/route.js";
import { RouteKeys } from "./utils/typings.js";
import { extractCurrentPage, loadMoviesPage, patchSearchInput, renderPage, resetPageParam } from "./utils/utils.js";

async function urlLocationHandler() {
    const page = extractCurrentPage();
    let location: string = window.location.pathname
    const route = urlRoutes[location as RouteKeys];
    route.renderHeading();
    document.title = route.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', route.description);
    if (route.fetchMovies) {
        setIsFetching(true);
        const movies = await route.fetchMovies();
        page === '1' ? renderPage(movies) : loadMoviesPage(movies);
    }
}
export function navigateTo(path: URL) {
    window.history.pushState({}, '', path);
    urlLocationHandler();
}

(async () => {
    resetPageParam();
    patchSearchInput();
    window.scrollTo({ top: 0 });
    window.onpopstate = urlLocationHandler;
    await urlLocationHandler();
})();
