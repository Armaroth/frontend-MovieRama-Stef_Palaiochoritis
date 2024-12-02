import { urlRoutes } from "./utils/route";
import { getCurrentPage, getCurrentRoute, getIsFetching, setCurrentRoute, setIsFetching } from "./state";
import { navigateTo } from "./urlRouter";
import { loadMoviesPage, resetHtml } from "./utils/utils";
const searchInput = document.getElementById('search') as HTMLInputElement;
let debounceTimeout: ReturnType<typeof setTimeout>;
searchInput.addEventListener('input', (event: Event) => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(async () => {
        const route = getCurrentRoute();
        if (!searchInput.value.trim() && route !== '/search') return;
        resetHtml();
        scrollTo(0, 0);
        if (searchInput.value) {
            setCurrentRoute('/search');
            navigateTo('/search');
        }
        else {
            if (route !== '/') {
                setCurrentRoute('/');
                navigateTo('/');
            }
        }
    }, 300);
});
window.addEventListener("scroll", handleScroll);
export async function handleScroll() {
    let scrollTimeout: NodeJS.Timeout | null = null;
    if (scrollTimeout) return;
    scrollTimeout = setTimeout(async () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 30 && !getIsFetching()) {
            const page = getCurrentPage();
            const route = getCurrentRoute();
            setIsFetching(true);
            if (urlRoutes[route].fetchMovies) {
                const movies = await urlRoutes[route].fetchMovies(page);
                if (!movies.length) {
                    setIsFetching(false);
                    return;
                }
                await loadMoviesPage(movies);
            }
        }
        setIsFetching(false);
    }, 400);
}
