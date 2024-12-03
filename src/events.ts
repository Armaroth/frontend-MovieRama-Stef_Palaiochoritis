import { urlRoutes } from "./utils/route";
import { getIsFetching, setIsFetching } from "./state";
import { navigateTo } from "./urlRouter";
import { extractCurrentPage, resetHtml } from "./utils/utils";
import { RouteKeys } from "./utils/typings";

const searchInput = document.getElementById('search') as HTMLInputElement;
let debounceTimeout: ReturnType<typeof setTimeout>;
searchInput.addEventListener('input', (event: Event) => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(async () => {
        resetHtml();
        scrollTo(0, 0);
        const url = new URL(window.location.origin + (searchInput.value.trim() ? '/search' : ''));
        !searchInput.value.trim() ? url.searchParams.delete('term') : url.searchParams.append('term', searchInput.value.trim());
        url.searchParams.delete('page');
        navigateTo(url);
    }, 300);
});
window.addEventListener("scroll", handleScroll);
export async function handleScroll() {
    let scrollTimeout: NodeJS.Timeout | null = null;
    if (scrollTimeout) return;
    scrollTimeout = setTimeout(async () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 300 && !getIsFetching()) {
            let location: string = window.location.pathname;
            const route = urlRoutes[location as RouteKeys];
            if (route.fetchMovies) {
                const pagestr = extractCurrentPage();
                const page = Number(pagestr) + 1;
                const url = URL.parse(window.location.href) as URL;
                url?.searchParams.set('page', page.toString());
                setIsFetching(true);
                const movies = await route.fetchMovies();
                if (!movies.length) {
                    return;
                }
                navigateTo(url);
            }
        }
    }, 1000);
}
