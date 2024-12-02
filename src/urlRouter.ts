import { urlRoutes } from "./utils/route.js";
import { RouteKeys } from "./utils/typings.js";
import { renderPage } from "./utils/utils.js";

async function urlLocationHandler() {
    let location: string | 404 = window.location.pathname in urlRoutes ? window.location.pathname : 404
    const route = urlRoutes[location as RouteKeys];
    route.renderHeading();
    document.title = route.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', route.description);
    if (route.fetchMovies) {
        const movies = await route.fetchMovies(1);
        await renderPage(movies);
    }

    // if (location === '/search') {
    //     const searchInput = document.getElementById('search') as HTMLInputElement;
    //     if (!searchInput.value) {
    //         setCurrentRoute('/');
    //         navigateTo('/');
    //         return;
    //     }
    // }

}
export function navigateTo(path: string) {
    window.history.pushState({}, '', path);
    urlLocationHandler();
}

await urlLocationHandler()
window.onpopstate = urlLocationHandler;