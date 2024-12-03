import { InferOutput } from 'valibot';
import { ExpandedMovieSchema, GenresSchema, MovieSchema } from "../api/valibot";
import { urlRoutes } from "./route";
export type RouteKeys = keyof typeof urlRoutes;
export type RouteConfig = {
    renderHeading: () => void
    title: string;
    description: string;
    fetchMovies?: () => Promise<Movies>
};
export type UrlRoutes = {
    [key: string]: RouteConfig;
};
export type AppState = {
    _isFetching: boolean
}
export type Genres = InferOutput<typeof GenresSchema>;
export type Movie = InferOutput<typeof MovieSchema>;
export type Movies = Movie[];
export type ExpandedMovie = InferOutput<typeof ExpandedMovieSchema>;
export type Review = ExpandedMovie['reviews'][number];