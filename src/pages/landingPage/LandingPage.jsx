import React, {useContext} from "react";
import {useQuery} from "react-query";
import LoadingComponent from "../../shared/loading/LoadingComponent";
import {PageContext} from "../../context/PageContext";
import {useNavigate} from "react-router-dom";

export default function LandingPage(props) {
    const {page, prevPage, nextPage} = useContext(PageContext);
    const navigate = useNavigate()
    let movies = [];
    const api = import.meta.env.VITE_API_KEY;
    const img_300 = "https://image.tmdb.org/t/p/w300";
    const {isLoading, data, error, refetch} = useQuery({
        queryKey: ["movies"],
        queryFn: async () => {
            const fetchMovies = await fetch(
                `https://api.themoviedb.org/3/trending/all/day?api_key=${api}&page=${page}`
            ).then((res) => res.json());
            return fetchMovies;
        },
        refetchOnWindowFocus: false,
    });
    const results = data ? data.results : movies;

    if (results.length > 0) {
        results.map(async (movie) => {
            return movies.push(movie);
        });
    }
    console.log(movies);
    const handleOpenDetailMovie = (movie) => {
        navigate('/details', {state: movie});
    }


    if (isLoading || !movies.length) {
        return (
            <>
                <div className="container h-screen flex justify-center items-center">
                    <LoadingComponent color={"#32cd32"} size="medium"/>
                </div>
            </>
        );
    }

    if (error) {
        return <h4>{error.message}</h4>;
    }

    return (
        <>
            <div className="container mx-auto py-12">
                <div className="flex justify-center items-center">
                    <div
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center items-center">
                        {movies?.map((movie, index) => {
                            return (
                                <button key={movie.id}
                                        className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-transparent duration-300"
                                        onClick={() => {
                                            handleOpenDetailMovie(movie)
                                        }}>
                                    <div
                                        className="card justify-center items-center"
                                        key={index}
                                    >
                                        <img
                                            src={`${img_300}${movie.poster_path}`}
                                            alt={
                                                movie.original_title ||
                                                movie.original_name ||
                                                movie.title
                                            }
                                            className="rounded-lg"
                                        />
                                        <h2 className="text-white mt-2 font-bold">
                                            {movie.original_title ||
                                                movie.original_name ||
                                                movie.title}
                                        </h2>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="btn-grp pt-5 gap-6 my-8 flex justify-center items-center">
                    <button
                        className="bg-gray-400 me-2 text-white rounded-lg w-24 h-8 hover:focus:"
                        onClick={async () => {
                            await prevPage();
                            refetch();
                        }}
                    >
                        Back
                    </button>
                    <button
                        className="bg-blue-700 text-white rounded-lg w-24 h-8 hover:focus:"
                        onClick={async () => {
                            await nextPage();
                            refetch();
                        }}
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
}
