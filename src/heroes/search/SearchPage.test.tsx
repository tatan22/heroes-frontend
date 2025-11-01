import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import SearchPage from "./SearchPage";
import { searchHeroesAction } from "../actions/search-heroes.action";
import type { Hero } from "../types/hero.interface";

vi.mock("../actions/search-heroes.action");
const mockSearchHeroesAction = vi.mocked(searchHeroesAction);

// Mock para el componente jumbotron
vi.mock("@/components/custom/CustomJumbotron", () => ({
	CustomJumbotron: () => (
		<div data-testid="custom-jumbotron">CustomJumbotron</div>
	),
}));

// Mock para el componente searchControl
vi.mock("./ui/SearchControls", () => ({
	SearchControls: () => (
		<div data-testid="search-controls">SearchControls</div>
	),
}));

// Mock para el componente HeroGrid
vi.mock("../components/HeroGrid", () => ({
	HeroGrid: ({ heroes }: { heroes: Hero[] }) => (
		<div data-testid="hero-grid">
			{heroes.map((hero) => (
				<div key={hero.id}>{hero.name}</div>
			))}
		</div>
	),
}));

const queryClient = new QueryClient();

const renderSearchPage = (initialEntries: string[] = ["/"]) => {
	return render(
		<MemoryRouter initialEntries={initialEntries}>
			<QueryClientProvider client={queryClient}>
				<SearchPage />
			</QueryClientProvider>
		</MemoryRouter>
	);
};

describe("SearchPage", () => {
	//Siempre que se use un Mock se debe limpiar el history de las peticiones
	beforeEach(() => {
		// mockSearchHeroesAction.mockClear();
		vi.clearAllMocks();
	});

	test("should render SearchPage with default values", () => {
		const { container } = renderSearchPage();
		expect(mockSearchHeroesAction).toHaveBeenCalledWith({
			name: undefined,
			strength: undefined,
		});
		expect(container).toMatchSnapshot();
		screen.debug();
	});

	test("should call search action with name parameter", () => {
		const { container } = renderSearchPage(["/search?name=superman"]);
		expect(mockSearchHeroesAction).toHaveBeenCalledWith({
			name: "superman",
			strength: undefined,
		});
		expect(container).toMatchSnapshot();
	});

	test("should call search action with strength parameter", () => {
		const { container } = renderSearchPage(["/search?strength=6"]);
		expect(mockSearchHeroesAction).toHaveBeenCalledWith({
			name: undefined,
			strength: "6",
		});
		expect(container).toMatchSnapshot();
	});

	test("should call search action with strength and name parameter", () => {
		const { container } = renderSearchPage([
			"/search?strength=6&name=superman",
		]);
		expect(mockSearchHeroesAction).toHaveBeenCalledWith({
			name: "superman",
			strength: "6",
		});
		expect(container).toMatchSnapshot();
	});

	test("should render HeroGrid with search results", async() => {
		const mockHero = [
			{
				id: "1",
				name: "Clark Kent",
			} as unknown as Hero,
			{
				id: "2",
				name: "Bruce Wayne",
			} as unknown as Hero,
		];
		mockSearchHeroesAction.mockResolvedValue(mockHero);
		renderSearchPage();
		await waitFor(() =>{
			expect(screen.getAllByText("Clark Kent")).toBeDefined();
			expect(screen.getAllByText("Bruce Wayne")).toBeDefined();
		})
		screen.debug(screen.getByTestId("hero-grid"));
	});
});
