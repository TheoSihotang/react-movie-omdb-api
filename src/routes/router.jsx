import {createBrowserRouter} from 'react-router-dom'
import LandingPage from '../pages/landingPage/LandingPage'
import { PageContext } from '../context/PageContext';
import { useContext } from 'react';

// const { page } = useContext(PageContext);
const router = createBrowserRouter([
    {
        path :  `/`,
        element : <LandingPage />
    }
])

export default router;