import React from 'react';
import {useLocation} from "react-router-dom";

function MovieDetails() {
    const location = useLocation();
    const data = location.state || {}
    console.log(data)
    return (
        <div>
            <h1 className="text-white">Ini Details</h1>
        </div>
    );
}

export default MovieDetails;