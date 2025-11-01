import { SlashIcon } from "lucide-react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Link } from "react-router";
interface BreadcrumbProps {
	label: string;
	to: string;
}
interface Props {
	currentPage: string;
	breadcrumbs?: BreadcrumbProps[];
}

export const CustomBreadcrumbs = ({ currentPage, breadcrumbs = [] }: Props) => {
	return (
		<>
			<Breadcrumb className="my-5">
				<BreadcrumbList>
					<BreadcrumbItem>
						{/* <BreadcrumbLink href="/">Inicio</BreadcrumbLink> */}
						{/*asChild es para poder usar el Link como un hijo y no haga un refresh */}
						<BreadcrumbLink asChild>
							<Link to="/">Inicio</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<div className="flex items-center">
						{breadcrumbs.map((crumb) => (
							<BreadcrumbItem>
								<BreadcrumbLink asChild>
									<Link to={crumb.to}>{crumb.label}</Link>
								</BreadcrumbLink>
							</BreadcrumbItem>
						))}
					</div>
          <BreadcrumbSeparator>
							<SlashIcon />
						</BreadcrumbSeparator>
					<BreadcrumbItem>
						<BreadcrumbLink className="capitalize text-blue-600 font-black">
							{currentPage}
						</BreadcrumbLink>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
		</>
	);
};
