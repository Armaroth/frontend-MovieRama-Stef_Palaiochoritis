import { urlRoutes } from "./route";
import { getCurrentPage, getCurrentRoute, getIsFetching, setCurrentRoute, setIsFetching } from "./state";
import { navigateTo } from "./urlRouter";
import { loadMoviesPage, resetHtml } from "./utils/utils";
const searchInput = document.getElementById('search') as HTMLInputElement;
let debounceTimeout: ReturnType<typeof setTimeout>;
searchInput.addEventListener('input', (event: Event) => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(async () => {
        resetHtml();
        scrollTo(0, 0);
        if (searchInput.value) {
            setCurrentRoute('/search');
            navigateTo('/search');
        }
        else {
            setCurrentRoute('/');
            navigateTo('/');
        }
    }, 300);
});
window.addEventListener("scroll", handleScroll);
export async function handleScroll() {
    let scrollTimeout: NodeJS.Timeout | null = null;
    if (scrollTimeout) return;
    scrollTimeout = setTimeout(async () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 10 && !getIsFetching()) {
            const page = getCurrentPage();
            const route = getCurrentRoute();
            setIsFetching(true);
            if (urlRoutes[route].fetch) {
                const movies = await urlRoutes[route].fetch(page);
                if (!movies.length) {
                    return;
                }
                await loadMoviesPage(movies)
            }
            setIsFetching(false);
        }
    }, 400);
}