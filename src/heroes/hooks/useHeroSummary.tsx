import { useQuery } from "@tanstack/react-query";
import { getSummaryAction } from "../actions/get-summary.action";

export const useHeroSummary = () => {
	return useQuery({ // estamos creando un wrapper o envoltorio a nuestro useQuery
		queryKey: ["summary-information"], // Donde sea que yo mande a llamar summary-information obtendré la misma data
		// queryFn: () => getSummaryAction(),
		queryFn: getSummaryAction,
		staleTime: 1000 * 60 * 5, // 5 min
	});
};
