import { AppState } from "./utils/typings";
// global state used to handle duplicate fetching
// created in a way to potentially add more properties in the future
const appState: AppState = {
    _isFetching: false,
};
//state getter
export function getIsFetching(): boolean {
    return appState._isFetching;
}

//state fetcher
export function setIsFetching(bool: boolean): void {
    appState._isFetching = bool;
}
