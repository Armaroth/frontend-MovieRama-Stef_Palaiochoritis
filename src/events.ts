import { urlRoutes } from "./utils/route";
import { getCurrentPage, getCurrentRoute, getIsFetching, setCurrentRoute, setIsFetching } from "./state";
import { navigateTo } from "./urlRouter";
import { loadMoviesPage, resetHtml } from "./utils/utils";
import { closeModal, createModal, showModal } from "./utils/views";
import { TMDB_API_KEY, TMDB_BASE_URL } from "./api/constants";
import { safeParse } from "valibot";
import { ModalMovieSchema } from "./api/valibot";
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
        if (scrollTop + clientHeight >= scrollHeight - 10 && !getIsFetching()) {
            const page = getCurrentPage();
            const route = getCurrentRoute();
            setIsFetching(true);
            if (urlRoutes[route].fetchMovies) {
                const movies = await urlRoutes[route].fetchMovies(page);
                if (!movies.length) {
                    return;
                }
                await loadMoviesPage(movies);
            }
            setIsFetching(false);
        }
    }, 400);
}
export async function addModalEvent(node: HTMLElement) {
    const oldModal = document.querySelector('.modal') as HTMLElement;
    if (oldModal) closeModal(oldModal);
    const buttons = node.querySelectorAll('.see-more');
    buttons.forEach(async (button) => {
        button.addEventListener('click', async () => {
            const movieId = button.getAttribute('data-movie-id');
            const modalInfo = await fetch(`${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&append_to_response=videos,reviews,similar`).
                then(data => data.json());
            const { output, success } = safeParse(ModalMovieSchema, modalInfo)
            if (!success) {
                if (button.parentElement) button.parentElement.innerHTML = '<h1 class="no-info">No additional info</h1>'
            }
            else {
                const modal: HTMLElement = createModal(output)
                showModal(modal);
            }
        })

    });
}