import { TMDB_API_KEY, TMDB_BASE_URL } from "./constants.js";
import { urlRoutes } from "./route.js";
import { renderInTheatersPage } from "./utils/inTheaters.js";
import { handleScroll, resetPageCounter } from "./utils/scroll.js";
import { getContentSection } from "./utils/utils.js";

declare global {
    interface Window {
        urlRoute: (event: MouseEvent) => void;
    }
}

// load page
// -> fetch movies
// -> innerHtml + attachEventListeners

// cla ss="movie"
// const movies = document.querySelector('.movies');
// movies.addEventListener('click', ....);
type RouteKeys = keyof typeof urlRoutes;
const urlPageTitle = "JS Single Page Application Router";
window.addEventListener("scroll", async () => await handleScroll());
// i should probably make the page scroll up on route change 
document.querySelectorAll('a').forEach(a => a.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    const target = e.target as HTMLAnchorElement;
    resetPageCounter();
    const input = document.getElementById('search') as HTMLInputElement;
    input.value = ''
    document.querySelectorAll('a')
        .forEach(a => a.href === target.href ?
            a.classList.add('active') : a.classList.remove('active'));
    urlRoute(e);
}));
function urlRoute(event: MouseEvent) {
    event.preventDefault();
    event = event || window.event;
    let target = event.target as HTMLAnchorElement;
    target = target.href ? target : target.parentElement as HTMLAnchorElement;
    window.history.pushState({}, '', target.href);
    urlLocationHandler();
}
async function urlLocationHandler() {
    let location = window.location.pathname;
    const page = resetPageCounter();
    if (location.length === 0) location = '/';
    const route = urlRoutes[location as RouteKeys] || urlRoutes[404];
    const html = await fetch(route.template)
        .then(response => response.text());
    const content = getContentSection();
    content.innerHTML = html;
    document.title = route.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', route.description);
    if (location == '/') {
        renderInTheatersPage(`${TMDB_BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`);
    }
}
window.onpopstate = urlLocationHandler;
window.urlRoute = urlRoute;
urlLocationHandler();
