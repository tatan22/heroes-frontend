import { Link, useLocation } from "react-router";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "../ui/navigation-menu";
import { cn } from "@/lib/utils";

export const CustomMenu = () => {
	const { pathname } = useLocation();
	// const isActive = (path: string) =>{
	// return pathname === path;
	// }
	const isActive = (path: string) => pathname === path;

	return (
		<>
			<NavigationMenu className="py-5">
				<NavigationMenuList>
					{/* Home */}
					<NavigationMenuItem>
						{/** asChild es para poder usar el Link como un hijo */}
						<NavigationMenuLink
							asChild
							className={cn(isActive("/") && "bg-slate-300 ", "rounded-md p-2")}
						>
							<Link to="/">Inicio</Link>
						</NavigationMenuLink>
					</NavigationMenuItem>
					{/* Search */}
					<NavigationMenuItem>
						<NavigationMenuLink
							asChild
							className={cn(
								isActive("/search") && "bg-slate-300 ",
								"rounded-md p-2"
							)}
						>
							<Link to="/search">Buscar Superhéroes</Link>
						</NavigationMenuLink>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</>
	);
};
