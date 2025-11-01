import { describe, expect, test, vi } from "vitest";
import { appRouter } from "./app.router";
import {
	createMemoryRouter,
	Outlet,
	RouterProvider,
	useParams,
} from "react-router";
import { render, screen } from "@testing-library/react";

vi.mock("@/heroes/layouts/HeroesLayout", () => ({
	HeroesLayout: () => (
		<div data-testid="heroes-layout">
			{/*renderiza la ruta hija  */}
			<Outlet />
		</div>
	),
}));
vi.mock("@pages/home/HomePage", () => ({
	// Se usa el default ya que el componente fue exportado por defecto
	default: () => <div data-testid="home-page"></div>,
}));
// Mock especial para el componente de heroes

vi.mock("@/heroes/pages/hero/HeroPage", () => ({
	HeroPage: () => {
		const { idSlug = "" } = useParams();
		return <div data-testid="hero-page">HeroPage - {idSlug}</div>;
	},
}));

vi.mock("@search/SearchPage", () => ({
	// Debemos retornar la exportación por defecto
	default: () => <div data-testid="search-page">SearchPage</div>,
}));

describe("AppRouter", () => {
	test("should be configured as expected", () => {
		expect(appRouter.routes).toMatchSnapshot();
	});
	
	test("should render home page at root path", () => {
		const router = createMemoryRouter(appRouter.routes, {
			initialEntries: ["/"], // Es una property donde indicamos las ruta donde estará el memory router 
		}); // Crea un touter en memoria
		render(<RouterProvider router={router} />);
		// screen.debug();
		expect(screen.getByTestId("home-page")).toBeDefined(); // Debe estar definido
	});

	/**	Vamos a evaluar el argumento por su url */
	test("should render hero page at /heroes/:idSlug path ", () => {
		const router = createMemoryRouter(appRouter.routes, {
			initialEntries: ["/heroes/superman"],
		});
		render(<RouterProvider router={router} />);
		// screen.debug();
		expect(screen.getByTestId("hero-page").innerHTML).toContain("superman");
	});

	test("Should render search page at /search path", async () => {
		const router = createMemoryRouter(appRouter.routes, {
			initialEntries: ["/search"],
		});
		render(<RouterProvider router={router} />);
		expect(await screen.findByTestId("search-page")).toBeDefined();
		// screen.debug();
	});

	test("Should redirect to home page for unknown routes", async () => {
		const router = createMemoryRouter(appRouter.routes, {
			initialEntries: ["/enviar-a-otra-pagina"],
		});
		render(<RouterProvider router={router} />);
		expect(await screen.findByTestId("home-page")).toBeDefined();
		screen.debug();
	});
});
