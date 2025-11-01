import type { HeroesResponse } from "../types/get-heroes.response";
import type { Hero } from "../types/hero.interface";
import { heroApi } from "../api/hero.api";

const BASE_URL = import.meta.env.VITE_API_URL;
export const getHeroesByPageAction = async (
	page: number,
	limit: number = 6,
	category: string = "all"
): Promise<HeroesResponse> => {
	if (isNaN(page)) page = 1; // Se puede crear una nueva variable para no mutar la original
	if (isNaN(limit)) limit = 6;
	const { data } = await heroApi.get(`/`, {
		params: {
			limit,
			offset: (page - 1) * limit,
			category,
		},
	});

	const heroes = data.heroes.map((hero: Hero) => ({
		...hero,
		image: `${BASE_URL}/images/${hero.image}`, // generamos un url para ver la imagen
	}));

	// Aremos un mapeo de la data
	return {
		...data,
		heroes,
	};
};
