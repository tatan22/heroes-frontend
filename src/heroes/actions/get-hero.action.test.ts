import { describe, expect, test } from "vitest";
import { getHeroAction } from "./get-hero.action";

describe("getHeroAction", () => {
	test("should fetch hero data and return with complete url", async () => {
		const result = await getHeroAction("clark-kent");
		const resultImageUrl = result.image;
		expect(resultImageUrl).toBe("http://localhost:3001/images/1.jpeg");
		expect(result).toStrictEqual({
			// comparar un Object
			// id: '1',
			id: expect.any(String),
			name: "Clark Kent",
			slug: "clark-kent",
			alias: "Superman",
			powers: [
				"Súper fuerza",
				"Vuelo",
				"Visión de calor",
				"Visión de rayos X",
				"Invulnerabilidad",
				"Súper velocidad",
			],
			description:
				"El Último Hijo de Krypton, protector de la Tierra y símbolo de esperanza para toda la humanidad.",
			strength: 10,
			intelligence: 8,
			speed: 9,
			durability: 10,
			team: "Liga de la Justicia",
			image: "http://localhost:3001/images/1.jpeg",
			firstAppearance: "1938",
			status: "Active",
			category: "Hero",
			universe: "DC",
		});
		// console.log(result);
	});
	test("should throw an error if hero is not found ", async () => {
		//? Parte de la excepción
		const idSlug = "batman-false";
		const result = await getHeroAction(idSlug).catch((error) => {
			expect(error).toBeDefined(); // definido
			expect(error.message).toBe("Request failed with status code 404");
			// console.log(error);
		});
		expect(result).toBeUndefined();// no definido 
	});
});
