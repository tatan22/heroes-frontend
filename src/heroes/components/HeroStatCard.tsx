import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { JSX, PropsWithChildren } from "react";

interface Props extends PropsWithChildren { // Esto extiende de PropsWithChildren que es un tipado de React
	title: string;
	icon: JSX.Element;
	// icon: React.ReactNode;
	// children?: React.ReactNode; // Lo mejor es pasar la property children
}

export const HeroStatCard = ({ title, icon, children }: Props) => {
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">{title}</CardTitle>
				{icon}
			</CardHeader>
			<CardContent>
				{children}
			</CardContent>
		</Card>
	);
};
