import { use } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import {
	FavoriteHeroContext,
	FavoriteHeroProvider,
} from "./FavoriteHeroContext";
import type { Hero } from "../types/hero.interface";

//Creamos el mock de un heroes favorito
const mockHero = {
	id: "1",
	name: "Superman",
} as Hero;

//? Creación de Mock Global
const localStorageMock = {
	getItem: vi.fn(),
	setItem: vi.fn(),
	clear: vi.fn(),
};
Object.defineProperty(window, "localStorage", { value: localStorageMock });

// Componente que depende del contexto
const TestComponent = () => {
	const { favoriteCount, favorites, isFavoriteHero, toggleFavorite } =
		use(FavoriteHeroContext);
	return (
		<>
			<div data-testid="favorite-count">{favoriteCount}</div>
			<div data-testid="favorite-list">
				{favorites.map((hero) => (
					<div key={hero.id} data-testid={`hero-${hero.id}`}>
						{hero.name}
					</div>
				))}
			</div>
			<button
				data-testid="toggle-favorite"
				onClick={() => toggleFavorite(mockHero)}
			>
				Toggle Favorite
			</button>
			<div data-testid="is-favorite">{isFavoriteHero(mockHero).toString()}</div>
		</>
	);
};
const renderContextTest = () => {
	return render(
		<FavoriteHeroProvider>
			<TestComponent />
		</FavoriteHeroProvider>
	);
};

describe("FavoriteHeroContext", () => {
	beforeEach(() => {
		localStorageMock.clear();
	});
	test("should initialize with default values", () => {
		renderContextTest();
		screen.debug();
		expect(screen.getByTestId("favorite-count").textContent).toBe("0");
		expect(screen.getByTestId("favorite-list").children.length).toBe(0);
	});

	test("should add a hero to favorites when toggleFavorite is called with new Hero", () => {
		renderContextTest();
		const button = screen.getByTestId("toggle-favorite");
		fireEvent.click(button);
		expect(screen.getByTestId("favorite-count").textContent).toBe("1");
		expect(screen.getByTestId("is-favorite").textContent).toBe("true");
		expect(screen.getByTestId("hero-1").textContent).toBe("Superman");
		expect(localStorageMock.setItem).toHaveBeenCalled();
		expect(localStorageMock.setItem).toHaveBeenCalledWith(
			"favorites",
			'[{"id":"1","name":"Superman"}]'
		);
	});
	test("should remove hero from favorites when toggleFavorite is called", () => {
		localStorageMock.getItem.mockReturnValue(JSON.stringify([mockHero]));
		renderContextTest();
		expect(screen.getByTestId("favorite-count").textContent).toBe("1");
		expect(screen.getByTestId("is-favorite").textContent).toBe("true");
		expect(screen.getByTestId("hero-1").textContent).toBe("Superman");
		const button = screen.getByTestId("toggle-favorite");
		fireEvent.click(button);
		expect(screen.getByTestId("favorite-count").textContent).toBe("0");
		expect(screen.getByTestId("is-favorite").textContent).toBe("false");
		expect(screen.queryByTestId("hero-1")).toBe(null);

    expect(localStorageMock.setItem).toHaveBeenCalled();
    expect(localStorageMock.setItem).toHaveBeenCalledWith("favorites", "[]");
	});
});
