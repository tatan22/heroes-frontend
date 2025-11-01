import { afterEach, describe, expect, test, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useHeroSummary } from "./useHeroSummary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import type { SummaryInformationResponse } from "../types/summary-information.response";
import { getSummaryAction } from "../actions/get-summary.action";

//? Crear un mock falso
vi.mock("@/heroes/actions/get-summary.action", () => ({
	getSummaryAction: vi.fn(), // es una función falsa para hacer pruebas
}));
const mockGetSummaryAction = vi.mocked(getSummaryAction);

// Encontrar el QueryClientProvider
const tanStackQueryProvider = () => {
	// se debe usar como un wrapper
	//?wrapper: es un componente que envuelve a nuestro componente principal
	//Definir el QueryClient
	const queryClient = new QueryClient({
		// Configuraciones que queremos para el QueryClient
		defaultOptions: {
			queries: {
				retry: false, // solo que haga una petición
			},
		},
	});
	return ({ children }: PropsWithChildren) => (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
};

describe("userHeroSummary", () => {
	afterEach(() => {
		vi.clearAllMocks(); // Limpiar mocks después de cada test
	});

	test("should return  the initial state (isLoading)", () => {
		const { result } = renderHook(() => useHeroSummary(), {
			wrapper: tanStackQueryProvider(),
		}); // renderHook necesita un funcional component
		// Tendremos problemas con el QueryClientProvider
		// console.log(result.current);
		expect(result.current.isLoading).toBeTruthy();
		expect(result.current.isError).toBeFalsy();
		expect(result.current.data).toBeUndefined();
	});

	test("should return success state data when API is call succeeds", async () => {
		const mockSummaryData = {
			totalHeroes: 10,
			strongestHero: {
				id: "1",
				name: "Superman",
			},
			smartestHero: {
				id: "2",
				name: "Batman",
			},
			heroCount: 18,
			villainCount: 7,
		} as SummaryInformationResponse;

		mockGetSummaryAction.mockResolvedValue(mockSummaryData);

		const { result } = renderHook(() => useHeroSummary(), {
			wrapper: tanStackQueryProvider(),
		});

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true); // espera que se cumpla la condición
		});
		// console.log(result.current);
		// expect(result.current.isLoading).toBe(false);
		// expect(result.current.isError).toBe(false);
		// expect(result.current.data).toStrictEqual({
		// 	totalHeroes: 25,
		// 	strongestHero: {
		// 		id: "1",
		// 		name: "Clark Kent",
		// 		slug: "clark-kent",
		// 		alias: "Superman",
		// 		powers: expect.any(Array),
		// 		description:
		// 			"El Último Hijo de Krypton, protector de la Tierra y símbolo de esperanza para toda la humanidad.",
		// 		strength: 10,
		// 		intelligence: 8,
		// 		speed: 9,
		// 		durability: 10,
		// 		team: "Liga de la Justicia",
		// 		image: "1.jpeg",
		// 		firstAppearance: "1938",
		// 		status: "Active",
		// 		category: "Hero",
		// 		universe: "DC",
		// 	},
		// 	smartestHero: {
		// 		id: "2",
		// 		name: "Bruce Wayne",
		// 		slug: "bruce-wayne",
		// 		alias: "Batman",
		// 		powers: expect.any(Array),
		// 		description:
		// 			"El Caballero Oscuro de Ciudad Gótica, que utiliza el miedo como arma contra el crimen y la corrupción.",
		// 		strength: 6,
		// 		intelligence: 10,
		// 		speed: 6,
		// 		durability: 7,
		// 		team: "Liga de la Justicia",
		// 		image: "2.jpeg",
		// 		firstAppearance: "1939",
		// 		status: "Active",
		// 		category: "Hero",
		// 		universe: "DC",
		// 	},
		// 	heroCount: 18,
		// 	villainCount: 7,
		// });
		expect(result.current.isError).toBe(false);
		expect(mockGetSummaryAction).toHaveBeenCalled();
		// expect(mockGetSummaryAction).toHaveBeenCalledWith();
	});
	test("should return error state when API call fails", async () => {
		const mockError = new Error("Failed to Fetch summary");

		mockGetSummaryAction.mockRejectedValue(mockError);
		const { result } = renderHook(() => useHeroSummary(), {
			wrapper: tanStackQueryProvider(),
		});
		await waitFor(() => {
			expect(result.current.isError).toBe(true); // espera que se cumpla la condición
		});
		// console.log(result);

		expect(result.current.error).toBe(mockError);
		expect(result.current.isLoading).toBe(false);
		expect(result.current.isError).toBe(true);
		expect(mockGetSummaryAction).toHaveBeenCalled();
		// expect(mockGetSummaryAction).toHaveBeenCalledTimes(1);
		expect(result.current.error?.message).toBe("Failed to Fetch summary");
		console.log(result.current.error?.message);
	});
});
