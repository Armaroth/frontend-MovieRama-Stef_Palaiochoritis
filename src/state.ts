
type AppState = {
    _currentPage: number
    _isFetching: boolean
    _currentRoute: string | 404
}
const appState: AppState = {
    _currentPage: 1,
    _isFetching: false,
    _currentRoute: '/',
};
export function getCurrentPage(): number {
    return ++appState._currentPage;
}
export function resetCurrentPage(): number {
    appState._currentPage = 1
    return appState._currentPage;
}

export function getIsFetching(): boolean {
    return appState._isFetching;
}

export function setIsFetching(bool: boolean): void {
    appState._isFetching = bool;
}

export function getCurrentRoute() {
    return appState._currentRoute
}


export function setCurrentRoute(route: string | 404) {
    appState._currentRoute = route;
    return route;
}
