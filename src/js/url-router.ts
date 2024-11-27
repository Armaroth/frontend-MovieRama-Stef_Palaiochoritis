import { fetchMovies } from "./api/tmdb-api.js";

declare global {
    interface Window {
        urlRoute: (event: MouseEvent) => void;
    }
}

type RouteKeys = keyof typeof urlRoutes;
const urlPageTitle = "JS Single Page Application Router";
document.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    console.log('test');
    const target = e.target as Element
    if (!target.matches('nav a')) return;
    urlRoute(e);
});
const urlRoutes = {
    404: {
        template: '/page/templates/404.html',
        title: "404 | " + urlPageTitle,
        description: "Page not found",
    },
    '/': {
        template: '/page/templates/index.html',
        title: "Home | " + urlPageTitle,
        description: ''
    },
    '/search': {
        template: '/page/templates/search.html',
        title: 'Search | ' + urlPageTitle,
        description: ''
    },
    '/genre': {
        template: '/page/templates/genre.html',
        title: 'Genre | ' + urlPageTitle,
        description: ''
    },
}



function urlRoute(event: MouseEvent) {
    event.preventDefault();
    event = event || window.event;
    const target = event.target as HTMLAnchorElement;
    window.history.pushState({}, '', target.href);
    urlLocationHandler();
}

async function urlLocationHandler() {
    // console.log('sdef')
    let location = window.location.pathname;

    if (location.length === 0) location = '/';

    const route = urlRoutes[location as RouteKeys] || urlRoutes[404];
    const html = await fetch(route.template)
        .then(response => response.text());
    const content = document.getElementById('content');
    if (content) {
        content.innerHTML = html;
        document.title = route.title;
        document.querySelector('meta[name="description"]')?.setAttribute('content', route.description)
    };
    fetchMovies();
}
window.onpopstate = urlLocationHandler;
window.urlRoute = urlRoute;
urlLocationHandler();
