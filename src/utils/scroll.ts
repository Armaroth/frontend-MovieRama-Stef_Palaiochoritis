import { TMDB_API_KEY, TMDB_BASE_URL } from "../constants";
import { renderInTheatersPage } from "./inTheaters";
let _currentPage = 0;

// i may have to move this variable somewhere that makes more sense
let isFetching = false;

export function getCurrentPage() {
    ++_currentPage;
    return _currentPage;
}
export function resetPageCounter() {
    _currentPage = 1;
    return _currentPage;

}

export async function handleScroll() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 10 && !isFetching) {
        const input = document.getElementById('search') as HTMLInputElement;
        const page = getCurrentPage();
        const query = input.value.trim()
        const endpoint = query ?
            `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page}` :
            `${TMDB_BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`
        isFetching = true;
        await renderInTheatersPage(endpoint);
        isFetching = false;
    }
}