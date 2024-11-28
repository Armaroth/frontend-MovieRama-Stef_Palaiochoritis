const urlPageTitle = "JS Single Page Application Router";

export const urlRoutes = {
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