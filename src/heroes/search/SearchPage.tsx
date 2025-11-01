import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "../components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { HeroGrid } from "../components/HeroGrid";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { searchHeroesAction } from "../actions/search-heroes.action";

export const SearchPage = () => {
	// TODO - Traer los heroes con useQuery
	const [searchParams] = useSearchParams();
	const name = searchParams.get("name") ?? undefined;
	const strength = searchParams.get("strength") ??undefined;
	const { data: heroes = [] } = useQuery({
		queryKey: ["search", { name, strength }],
		queryFn: () => searchHeroesAction({ name, strength }),
		staleTime: 1000 * 60 * 5,
	});

	return (
		<>
			<CustomJumbotron
				title="Búsqueda de héroes en Tatán"
				description="Descubre, explora superhéroes y villanos con Tatán"
			/>
			<CustomBreadcrumbs
				currentPage="Buscador de héroes"
				// breadcrumbs={[{ label: "Heroes", to: "/heroes" }]}
			/>
			{/**Stats Dashboard */}
			<HeroStats />

			{/**Controls */}
			<SearchControls />
			
			<HeroGrid heroes={heroes} />
		</>
	);
};

export default SearchPage;
