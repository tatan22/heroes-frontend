import { useQuery } from "@tanstack/react-query";
import { getHeroesByPageAction } from "../actions/get-heroes-by-page.action";

export const usePaginateHero = (page: number, limit: number, category: string = 'all') => {
	return useQuery({
		// Renombro mediante JS a heroesResponse
		// queryKey: ["heroes", 'page', page, 'limit', limit],// tendría que tener el mismo orden que el queryKey
		//? Para prevenir problema con el orden de los parámetros en la url
		// queryKey: ["heroes", {'page': page, 'limit': limit}],
		//? Por simplicidad ECMA6 se puede hacer de la siguiente manera
		// queryKey: ["heroes", category, { page: page, limit }],// También se puede usar de esta forma 
		queryKey: ["heroes", { page, limit, category }],
		queryFn: () => getHeroesByPageAction(+page, +limit, category),
		staleTime: 1000 * 60 * 5, // 5 min en los cuales no ara la petición sera considerada fresca
	});
};
