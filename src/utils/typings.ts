import { InferOutput } from 'valibot';
import { genresSchema, ModalMovieSchema, MovieSchema } from "../api/valibot";
import { urlRoutes } from "./route";
export type RouteKeys = keyof typeof urlRoutes;
export type RouteConfig = {
    heading: string;
    title: string;
    description: string;
    fetchMovies?: (page: number) => Promise<Movies>
};
export type UrlRoutes = {
    [key: string]: RouteConfig;
};


export type AppState = {
    _currentPage: number
    _isFetching: boolean
    _currentRoute: string | 404
}

declare global {
    interface Window {
        urlRoute: (event: MouseEvent) => void;
    }
}
export type Genres = InferOutput<typeof genresSchema>;
export type Movie = InferOutput<typeof MovieSchema>;
export type Movies = Movie[];
export type ModalMovie = InferOutput<typeof ModalMovieSchema>;
