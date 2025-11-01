// en JavaScript solo tendríamos que hacer
// export const FavoriteHeroContext = createContext({});

// implementación con TS
import {
	createContext,
	useEffect,
	useState,
	type PropsWithChildren,
} from "react";
import type { Hero } from "../types/hero.interface";
interface FavoriteHeroContextProps {
	//States
	favorites: Hero[];
	favoriteCount: number;
	//Methods
	isFavoriteHero: (hero: Hero) => boolean;
	toggleFavorite: (hero: Hero) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const FavoriteHeroContext = createContext(
	{} as FavoriteHeroContextProps
); // usamos este tipado para inicializarlo en le provider
const getFavoritesFromLocalStorage = (): Hero[] => {
	const favorites = localStorage.getItem("favorites");
	//? punto intermedio importante validar la data que luzca como la esperamos, puede ser con zod
	return favorites ? JSON.parse(favorites) : [];
};

export const FavoriteHeroProvider = ({ children }: PropsWithChildren) => {
	// haremos un higher order component
	const [favorites, setFavorites] = useState<Hero[]>(
		getFavoritesFromLocalStorage()
	);
	const toggleFavorite = (hero: Hero) => {
		const heroExist = favorites.find((h) => h.id === hero.id);
		if (heroExist) {
			setFavorites(favorites.filter((h) => h.id !== hero.id));
			return;
		}
		setFavorites([...favorites, hero]);
	};
	const isFavoriteHero = (hero: Hero) =>
		favorites.some((h) => h.id === hero.id);
	useEffect(() => {
		localStorage.setItem("favorites", JSON.stringify(favorites));
	}, [favorites]);

	return (
		<FavoriteHeroContext
			value={{
				favoriteCount: favorites.length,
				favorites,
				// isFavoriteHero: (hero: Hero) => favorites.some((h) => h.id === hero.id),
				isFavoriteHero: isFavoriteHero,
				toggleFavorite: toggleFavorite,
			}}
		>
			{children}
		</FavoriteHeroContext>
	);
};
