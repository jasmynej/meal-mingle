import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Admin from "./pages/Admin";

const router = createBrowserRouter(
    [
        {
            path:"/",
            element:<App/>
        },
        {
            path:"/admin",
            element:<Admin/>
        }
    ]
)
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <RouterProvider router={router}/>
);