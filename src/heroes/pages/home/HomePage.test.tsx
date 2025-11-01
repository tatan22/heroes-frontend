import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import HomePage from "./HomePage";
import { MemoryRouter } from "react-router";
import { usePaginateHero } from "@/heroes/hooks/usePaginateHero";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FavoriteHeroProvider } from "@/heroes/context/FavoriteHeroContext";

vi.mock("@/heroes/hooks/usePaginateHero");
const mockUsePaginateHero = vi.mocked(usePaginateHero);

mockUsePaginateHero.mockReturnValue({
	data: [],
	isLoading: false,
	isError: false,
	isSuccess: false,
} as unknown as ReturnType<typeof usePaginateHero>);
//⬆ Le indicamos que trate el valor de retorno como usePaginateHero

const queryClient = new QueryClient();

const renderHomePage = (initialEntries: string[] = ["/"]) => {
	return render(
		<MemoryRouter initialEntries={initialEntries}>
			<FavoriteHeroProvider>
				<QueryClientProvider client={queryClient}>
					<HomePage />
				</QueryClientProvider>
			</FavoriteHeroProvider>
		</MemoryRouter>
	);
};

describe("HomePage", () => {
	//! Siempre que se use un Mock se debe limpiar el history de las peticiones
	beforeEach(() => {
		mockUsePaginateHero.mockClear();
	});
	test("should render HomePage with default values", () => {
		const { container } = renderHomePage();
		// screen.debug();
		expect(container).toMatchSnapshot();
	});

	test("should call usePaginateHero with default values", () => {
		renderHomePage();
		expect(mockUsePaginateHero).toHaveBeenCalledWith(1, 6, "all");
	});

	//! ⬇ Si no se limpia el mock esta siguiente prueba seria un falso positivo
	test("should call usePaginateHero with custom query params", () => {
		renderHomePage(["/?page=2&limit=10&category=villains"]);
		expect(mockUsePaginateHero).toHaveBeenCalledWith(2, 10, "villains");
	});

	//! ⬇ Para solucionar el error hacer map de undefined es envolver el HomePage con FavoriteHeroProvider
	test("should called usePaginateHero with default page and same limit on tab click ", () => {
		renderHomePage(["/?tab=favorites&page=2&limit=10"]);
		// expect(mockUsePaginateHero).toHaveBeenCalledWith(2, 6, "all");
		/** Para el evento tab usando Shadcn no es un elemento tap, este es transformado en un div o un button
		 *  pero si tiene un atributo role */
		const [, , , villainsTab] = screen.getAllByRole("tab");
		screen.debug(villainsTab);
		fireEvent.click(villainsTab);
		expect(mockUsePaginateHero).toHaveBeenCalledWith(1, 10, "Villain");
	});
});
