import React, { useContext } from "react";
import { useQuery } from "react-query";
import LoadingComponent from "../../shared/loading/LoadingComponent";
import { PageContext } from "../../context/PageContext";

export default function LandingPage(props) {
    const { page, prevPage, nextPage } = useContext(PageContext);
    console.log(page);
    const movies = [];
    const api = "e76cd818b481963990ac24a6a6787eca";
    const img_300 = "https://image.tmdb.org/t/p/w300";
    const { isLoading, data, error, refetch } = useQuery({
        queryKey: ["movies"],
        queryFn: async () => {
            const movies = await fetch(
                `https://api.themoviedb.org/3/trending/all/day?api_key=${api}&page=${page}`
            ).then((res) => res.json());
            return movies;
        },
        refetchOnWindowFocus: false,
    });
    const results = data ? data.results : movies;

    if (results.length > 0) {
        results.map(async (movie) => {
            return await movies.push(movie);
        });
    }
    console.log(movies);

    if (isLoading || !movies.length) {
        return (
            <>
                <div className="container h-screen flex justify-center items-center">
                    <LoadingComponent color={"#32cd32"} size="medium" />
                </div>
            </>
        );
    }

    if (error) {
        return <h4>{error.message}</h4>;
    }

    return (
        <>
            <div className="container mx-auto p-10 justify-center items-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {movies?.map((movie, index) => {
                        return (
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
                                <h2 className="text-white mt-2">
                                    {movie.original_title ||
                                        movie.original_name ||
                                        movie.title}
                                </h2>
                            </div>
                        );
                    })}
                </div>

                <div className="btn-grp pt-5">
                    <button
                        className="bg-gray-400 me-2 text-white rounded-lg w-24 h-8 hover:focus:"
                        onClick={async () => {
                            await prevPage()
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
