"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const urlPageTitle = "JS Single Page Application Router";
document.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('test');
    const target = e.target;
    if (!target.matches('nav a'))
        return;
    urlRoute(e);
});
const urlRoutes = {
    404: {
        template: '/templates/404.html',
        title: "404 | " + urlPageTitle,
        description: "Page not found",
    },
    '/': {
        template: '/templates/index.html',
        title: "Home | " + urlPageTitle,
        description: ''
    },
    '/search': {
        template: '/templates/search.html',
        title: 'Search | ' + urlPageTitle,
        description: ''
    },
    '/genre': {
        template: '/templates/genre.html',
        title: 'Genre | ' + urlPageTitle,
        description: ''
    },
};
function urlRoute(event) {
    event.preventDefault();
    event = event || window.event;
    const target = event.target;
    window.history.pushState({}, '', target.href);
    urlLocationHandler();
}
function urlLocationHandler() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        // console.log('sdef')
        let location = window.location.pathname;
        if (location.length === 0)
            location = '/';
        const route = urlRoutes[location] || urlRoutes[404];
        const html = yield fetch(route.template)
            .then(response => response.text());
        const content = document.getElementById('content');
        if (content) {
            content.innerHTML = html;
            document.title = route.title;
            (_a = document.querySelector('meta[name="description"]')) === null || _a === void 0 ? void 0 : _a.setAttribute('content', route.description);
        }
        ;
    });
}
window.onpopstate = urlLocationHandler;
window.urlRoute = urlRoute;
urlLocationHandler();
