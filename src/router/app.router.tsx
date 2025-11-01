import { createHashRouter, Navigate } from "react-router";
import HomePage from "@pages/home/HomePage";
import { AdminPage } from "@adminPages/AdminPage";
import { HeroesLayout } from "@/heroes/layouts/HeroesLayout";
import { AdminLayout } from "@/heroes/layouts/AdminLayout";
import { lazy } from "react";
import { HeroPage } from "@/heroes/pages/hero/HeroPage";

// import { SearchPage } from "@search/SearchPage";
// Le pasamos un callback que retorna una promesa, apenas se resuelva la promesa obtendremos un modulo
// const SearchPage = lazy(() => import("@search/SearchPage").then((module) => ({ default: module.SearchPage })));
//? Toda la linea de arriba loa evitamos asiendo una importación por defecto del componente
const SearchPage = lazy(() => import("@search/SearchPage"));

// export const appRouter = createBrowserRouter([
export const appRouter = createHashRouter([// ua es un hash router por usar el model de hash
	// createBrowserRouter por usar el model de data
	{
		path: "/",
		element: <HeroesLayout />,
		children: [
			{
				index: true,
				element: <HomePage />,
				// Component: <div>Home</div>, también puede se usado como component
			},
			{
				path: "/heroes/:idSlug",
				element: <HeroPage />,
			},
			{
				path: "/search",
				element: <SearchPage />,
			},
			{
				path: "*",
				// element: <h1>404</h1>,
				element: <Navigate to="/" />,
			},
		],
	},
	{
		path: "/admin",
		element: <AdminLayout />,
		children: [
			{
				index: true,
				element: <AdminPage />,
			},
		],
	},
]);
