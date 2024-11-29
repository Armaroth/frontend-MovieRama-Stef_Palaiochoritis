import { urlRoutes } from "./route.js";
import { getCurrentRoute, resetCurrentPage, setCurrentRoute } from "./state.js";
import { RouteKeys } from "./utils/typings.js";
import { renderHeading, renderPage, resetHtml } from "./utils/utils.js";
// -> innerHtml + attachEventListeners

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
    setActiveLink();
    if (window.location.pathname === '/search') {
        const searchInput = document.getElementById('search') as HTMLInputElement;
        if (!searchInput.value) {
            setCurrentRoute('/');
            navigateTo('/');
            return;
        }
    }
    if (location in urlRoutes) {
        setCurrentRoute(location);
    } else {
        setCurrentRoute(404);
    }
    const currentRoute = getCurrentRoute();
    const route = urlRoutes[currentRoute as RouteKeys];
    const page = resetCurrentPage();
    document.title = route.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', route.description);
    renderHeading(route.heading);
    if (route.fetchMovies) {
        const movies = await route.fetchMovies(page);
        await renderPage(movies);
    }
}

window.onpopstate = urlLocationHandler;
window.urlRoute = urlRoute;
await urlLocationHandler();
export function navigateTo(path: string) {
    window.history.pushState({}, '', path);
    urlLocationHandler();
}
function setActiveLink() {
    document.querySelectorAll('a')
        .forEach(a => {
            a.href === `${window.location.origin}${window.location.pathname}` ?
                a.classList.add('active') : a.classList.remove('active');
        });
}
