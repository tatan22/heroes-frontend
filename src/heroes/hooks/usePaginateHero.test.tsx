import type { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import { usePaginateHero } from "./usePaginateHero";
import { getHeroesByPageAction } from "../actions/get-heroes-by-page.action";

vi.mock("../actions/get-heroes-by-page.action.ts", () => ({
	getHeroesByPageAction: vi.fn(),
}));

const mockGetHeroesByPageAction = vi.mocked(getHeroesByPageAction);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
const tanStackQueryProvider = () => {
	return ({ children }: PropsWithChildren) => (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
};

describe("userPaginateHero", () => {

  afterEach(() => {
		vi.clearAllMocks(); // Limpiar mocks después de cada test
    queryClient.clear(); // Limpiar cache de queries después de cada test
	});

	test("should return  the initial state (isLoading)", () => {
		const { result } = renderHook(() => usePaginateHero(1, 6), {
			wrapper: tanStackQueryProvider(),
		});
		expect(result.current.isLoading).toBeTruthy();
		expect(result.current.isError).toBeFalsy();
		expect(result.current.data).toBeUndefined();
	});

	test("should return success state with data when API call succeeds", async () => {
		const mockHeroesData = {
			total: 20,
			pages: 2,
			heroes: [],
		};
		mockGetHeroesByPageAction.mockResolvedValue(mockHeroesData);
		const { result } = renderHook(() => usePaginateHero(1, 6), {
			wrapper: tanStackQueryProvider(),
		});

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy();
		});
		// console.log(result.current);
    
		expect(result.current.status).toBe('success');
		expect(mockGetHeroesByPageAction).toHaveBeenCalled();
		expect(mockGetHeroesByPageAction).toHaveBeenCalledWith(1, 6, "all"); // llamado con
	});

	test("should return getHeroesByPageAction with argument", async () => {
		const mockHeroesData = {
			total: 20,
			pages: 2,
			heroes: [],
		};
		mockGetHeroesByPageAction.mockResolvedValue(mockHeroesData);
		const { result } = renderHook(() => usePaginateHero(2, 16, 'heroes'), {
			wrapper: tanStackQueryProvider(),
		});

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy();
		});
		// console.log(result.current);
    
		expect(result.current.status).toBe('success');
		expect(mockGetHeroesByPageAction).toHaveBeenCalled();
		expect(mockGetHeroesByPageAction).toHaveBeenCalledWith(2, 16, "heroes"); // llamado con
	});
});
