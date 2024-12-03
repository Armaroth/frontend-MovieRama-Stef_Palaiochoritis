import { AppState } from "./utils/typings";
const appState: AppState = {
    _isFetching: false,
};

export function getIsFetching(): boolean {
    return appState._isFetching;
}
export function setIsFetching(bool: boolean): void {
    appState._isFetching = bool;
}
