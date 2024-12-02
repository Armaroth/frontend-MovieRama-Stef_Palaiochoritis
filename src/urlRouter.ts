import { urlRoutes } from "./utils/route.js";
import { resetCurrentPage, setCurrentRoute } from "./state.js";
import { RouteKeys } from "./utils/typings.js";
import {renderPage, resetHtml } from "./utils/utils.js";

document.querySelectorAll('a').forEach(a => a.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    const input = document.getElementById('search') as HTMLInputElement;
    input.value = '';
    resetHtml();
    urlRoute(e);
}));
function urlRoute(event: MouseEvent) {
    event.preventDefault();
    let target = event.target as HTMLAnchorElement;
    target = target.href ? target : target.parentElement as HTMLAnchorElement;
    window.history.pushState({}, '', target.href);
    setCurrentRoute(target.pathname);
    urlLocationHandler();
}
async function urlLocationHandler() {
    let location = window.location.pathname;
    if (window.location.pathname === '/search') {
        const searchInput = document.getElementById('search') as HTMLInputElement;
        if (!searchInput.value) {
            setCurrentRoute('/');
            navigateTo('/');
            return;
        }
    }
    const currentRoute = setCurrentRoute(location in urlRoutes ? location : 404)
    const route = urlRoutes[currentRoute as RouteKeys];
    const page = resetCurrentPage();
    document.title = route.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', route.description);
    route.renderHeading();
        if (route.fetchMovies) {
        const movies = await route.fetchMovies(page);
        await renderPage(movies);
    }
}
export function navigateTo(path: string) {
    window.history.pushState({}, '', path);
    urlLocationHandler();
}

await urlLocationHandler()
window.onpopstate = urlLocationHandler;