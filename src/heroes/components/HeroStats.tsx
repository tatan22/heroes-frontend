import { Users, Heart, Zap, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { HeroStatCard } from "./HeroStatCard";
import { useHeroSummary } from "../hooks/useHeroSummary";
import { use } from "react";
import { FavoriteHeroContext } from "../context/FavoriteHeroContext";

export const HeroStats = () => {
	const { data: summary } = useHeroSummary();
	const { favoriteCount } = use(FavoriteHeroContext);

	if (!summary) return <div>Loading...</div>;

	const favoriteHeroesRate = (favoriteCount / summary.totalHeroes) * 100;

	return (
		<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
			{/* 1️⃣ Total de personajes */}
			<HeroStatCard
				title="Total de Personajes"
				icon={<Users className="h-4 w-4 text-muted-foreground" />}
			>
				<div className="text-2xl font-bold">{summary?.totalHeroes}</div>
				<div className="flex gap-1 mt-2">
					<Badge variant="secondary" className="text-xs">
						{summary?.heroCount}
					</Badge>
					<Badge variant="destructive" className="text-xs">
						{summary?.villainCount}
					</Badge>
				</div>
			</HeroStatCard>

			{/* 2️⃣ Favoritos */}
			<HeroStatCard
				title="Favoritos"
				icon={<Heart className="h-4 w-4 text-muted-foreground" />}
			>
				<div className="text-2xl font-bold text-red-600" data-testid="favorite-count">{favoriteCount}</div>
				<p className="text-xs text-muted-foreground">
					<span className="font-bold" data-testid="favorite-percentage">
						{favoriteHeroesRate.toFixed(2)}%
					</span>{" "}
					del total
				</p>
			</HeroStatCard>

			{/* 3️⃣ Fuerte */}
			<HeroStatCard
				title="Fuerte"
				icon={<Zap className="h-4 w-4 text-muted-foreground" />}
			>
				<div className="text-lg font-bold">{summary?.strongestHero.alias}</div>
				<p className="text-xs text-muted-foreground">
					Strength: {summary?.strongestHero.strength}/10
				</p>
			</HeroStatCard>

			{/* 4️⃣ Inteligente */}
			<HeroStatCard
				title="Inteligente"
				icon={<Trophy className="h-4 w-4 text-muted-foreground" />}
			>
				<div className="text-lg font-bold">{summary?.smartestHero.alias}</div>
				<p className="text-xs text-muted-foreground">
					Intelligence: {summary?.smartestHero.intelligence}/10
				</p>
			</HeroStatCard>
		</div>
	);
};
