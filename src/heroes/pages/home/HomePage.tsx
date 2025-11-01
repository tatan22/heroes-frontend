// import { Input } from "@/components/ui/input";
// import { useState } from "react";
import { useSearchParams } from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
// import img from "next/image"; esta linea era para usar imágenes con next
import { HeroStats } from "../../components/HeroStats";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { use, useMemo } from "react";
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary";
import { usePaginateHero } from "@/heroes/hooks/usePaginateHero";
import { FavoriteHeroContext } from "@/heroes/context/FavoriteHeroContext";

// type tabProps = "all" | "favorites" | "heroes" | "villains";

export default function HomePage() {
	const [searchParams, setSearchParams] = useSearchParams();
	const { favoriteCount, favorites } = use(FavoriteHeroContext);

	const activeTab = searchParams.get("tab") || "all";
	const page = searchParams.get("page") || "1";
	const limit = searchParams.get("limit") || "6";
	const category = searchParams.get("category") || "all";

	const selectedTab = useMemo(() => {
		const validTaps = ["all", "favorites", "heroes", "villains"];
		return validTaps.includes(activeTab) ? activeTab : "all";
	}, [activeTab]);

	//? usePaginatedHeroes
	const { data: heroesResponse } = usePaginateHero(+page, +limit, category);
	const { data: summary } = useHeroSummary();

	return (
		<>
			<>
				{/* Header */}
				<CustomJumbotron
					title="Universo de SuperHéroes con Tatán"
					description="Descubre y administra superHéroes y villanos con Tatán"
				/>
				{/* Breadcrumbs */}
				<CustomBreadcrumbs currentPage="Heroes" />

				{/* Stats Dashboard */}
				<HeroStats />

				{/* Advanced Filters */}

				{/* Tabs */}
				<Tabs value={selectedTab} className="mb-8">
					<TabsList className="grid w-full grid-cols-4">
						<TabsTrigger
							value="all"
							// onClick={() => setSearchParams("?tab=all")}
							//? Se mejora la implementación para que puedan existir otros parámetros en la url
							onClick={() =>
								setSearchParams((prev) => {
									prev.set("tab", "all");
									prev.set("category", "all");
									prev.set("page", "1");
									return prev;
								})
							}
						>
							All Characters ({heroesResponse?.total})
						</TabsTrigger>
						<TabsTrigger
							value="favorites"
							className="flex items-center gap-2"
							onClick={() =>
								setSearchParams((prev) => {
									prev.set("tab", "favorites");
									prev.set("category", "favorites");
									prev.set("page", "1");
									return prev;
								})
							}
						>
							Favorites ({favoriteCount})
						</TabsTrigger>
						<TabsTrigger
							value="heroes"
							onClick={() =>
								setSearchParams((prev) => {
									prev.set("tab", "heroes");
									prev.set("category", "Hero");
									prev.set("page", "1");
									return prev;
								})
							}
						>
							Heroes ({summary?.heroCount})
						</TabsTrigger>
						<TabsTrigger
							value="villains"
							onClick={() =>
								setSearchParams((prev) => {
									prev.set("tab", "villains");
									prev.set("category", "Villain");
									prev.set("page", "1");
									return prev;
								})
							}
						>
							Villains ({summary?.villainCount})
						</TabsTrigger>
					</TabsList>

					<TabsContent value="all">
						{""}
						{/* se le debe pasar un value a cada TabsContent*/}
						{/* Mostrar todos los personajes */}
						{/* Character Grid */}
						<h1>Todos los personajes </h1>
						<HeroGrid heroes={heroesResponse?.heroes ?? []} />
					</TabsContent>
					<TabsContent value="favorites">
						{" "}
						{/* Mostrar personajes favoritos*/}
						<h1>Favoritos!!!</h1>
						<HeroGrid heroes={favorites} />
					</TabsContent>
					<TabsContent value="heroes">
						{" "}
						{/*<Mostrar personajes heroes*/}
						<HeroGrid heroes={heroesResponse?.heroes ?? []} />
						<h1>Héroes</h1>
					</TabsContent>
					<TabsContent value="villains">
						{" "}
						{/*<Mostrar personajes villanos*/}
						<h1>Villanos</h1>
						<HeroGrid heroes={heroesResponse?.heroes ?? []} />
					</TabsContent>
				</Tabs>

				{/* Pagination */}
				{selectedTab !== "favorites" && (
					<CustomPagination totalPages={heroesResponse?.pages ?? 1} />
				)}
			</>
		</>
	);
}
