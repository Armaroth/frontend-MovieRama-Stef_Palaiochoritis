import { TMDB_API_KEY, TMDB_BASE_URL } from "./constants";
import { renderInTheatersPage } from "./utils/inTheaters";
import { resetPageCounter } from "./utils/scroll";
import { resetHtml } from "./utils/utils";

const searchInput = document.getElementById('search') as HTMLInputElement;
let debounceTimeout: ReturnType<typeof setTimeout>;
let state: 'starter' | 'searching' = 'starter';
searchInput.addEventListener('input', (event: Event) => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(async () => {
        resetHtml();
        const page = resetPageCounter();
        let endpoint = '';
        if (!searchInput.value && state !== 'starter') {
            endpoint = `${TMDB_BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`;
            state = 'starter';
        } else {
            const query = searchInput.value.trim();
            if (query) {
                endpoint = `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page}`;
                state = 'searching';
            }
        }
        renderInTheatersPage(endpoint)
    }, 300);
});