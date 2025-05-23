import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "urql";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "~/src/pages/HomePage";
import { client } from "~/src/services/graphql";
import "~/src/styles/global.css";
import NotFoundPage from "~/src/pages/NotFoundPage/NotFoundPage";

const CharacterPage = lazy(() => import("./pages/CharacterPage/CharacterPage"));

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/character/:id",
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <CharacterPage />
            </Suspense>
        ),
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Provider value={client}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>,
);