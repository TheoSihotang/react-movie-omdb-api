import {createBrowserRouter} from 'react-router-dom'
import LandingPage from '../pages/landingPage/LandingPage'
import { PageContext } from '../context/PageContext';
import { useContext } from 'react';
import MovieDetails from "../pages/Details/MovieDetails.jsx";

// const { page } = useContext(PageContext);
const router = createBrowserRouter([
    {
        path :  `/`,
        element : <LandingPage />
    },
    {
        path : '/details',
        element: <MovieDetails />
    }
])

export default router;