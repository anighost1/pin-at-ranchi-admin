import {
    createBrowserRouter,
} from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import App, { AppLoader } from "../App";
import Item from "../pages/Item";
import ItemDetails from "../components/ItemDetails";
import Login, { LoginLoader } from "../pages/Login";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        loader: AppLoader,
        children: [
            {
                path: '',
                element: <Dashboard />
            },
            {
                path: 'item',
                element: <Item />
            },
            {
                path: 'item/details',
                element: <ItemDetails />
            },
            {
                path: 'item/details/:itemId',
                element: <ItemDetails />
            },

        ]
    },
    {
        path: '/login',
        element: <Login />,
        loader: LoginLoader
    }
])

export default router