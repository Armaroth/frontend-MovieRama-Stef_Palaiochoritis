import { renderInTheatersPage } from "./inTheaters";
let _currentPage = 0;

// i may have to move this variable somewhere that makes more sense
let isFetching = false;

export function getCurrentPage() {
    ++_currentPage;
    return _currentPage;
}
// export function resetPage(){
//_currentPage=0;
//}
//
export async function handleScroll() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 10 && !isFetching) {
        isFetching = true;
        await renderInTheatersPage();
        isFetching = false;
    }
}