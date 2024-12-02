import { InferOutput } from 'valibot';
import { ExpandedMovieSchema, GenresSchema, MovieSchema } from "../api/valibot";
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
export type Genres = InferOutput<typeof GenresSchema>;
export type Movie = InferOutput<typeof MovieSchema>;
export type Movies = Movie[];
export type ExpandedMovie = InferOutput<typeof ExpandedMovieSchema>;
export type Review = ExpandedMovie['reviews'][number];