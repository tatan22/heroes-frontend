import { describe, expect, test } from "vitest";
import { getSummaryAction } from "./get-summary.action";

describe("getHeroAction", () => {
	test("should fetch summary and return complete information", async () => {
		const summary = await getSummaryAction();
		expect(summary).toStrictEqual({
			// totalHeroes: 25,
			totalHeroes: expect.any(Number),
			// strongestHero: { // Esperamos un objeto que contenga esta información del heroes
			strongestHero: expect.objectContaining( {
				// id: "1",
				id: expect.any(String),
				// name: "Clark Kent",
        name: expect.any(String),
				// slug: "clark-kent",
        slug: expect.any(String),
				// alias: "Superman",
        alias: expect.any(String),
				// powers: [
				// 	"Súper fuerza",
				// 	"Vuelo",
				// 	"Visión de calor",
				// 	"Visión de rayos X",
				// 	"Invulnerabilidad",
				// 	"Súper velocidad",
				// ],
        powers: expect.any(Array),
				// description:
				// 	"El Último Hijo de Krypton, protector de la Tierra y símbolo de esperanza para toda la humanidad.",
        description: expect.any(String),
				// strength: 10,
        strength: expect.any(Number),
				// intelligence: 8,
        intelligence: expect.any(Number),
				// speed: 9,
        speed: expect.any(Number),
				// durability: 10,
        durability: expect.any(Number),
				// team: "Liga de la Justicia",
        team: expect.any(String),
				// image: "1.jpeg",
        image: expect.any(String),
				// firstAppearance: "1938",
        firstAppearance: expect.any(String),
				// status: "Active",
        status: expect.any(String),
				// category: "Hero",
        category: expect.any(String),
				// universe: "DC",
        universe: expect.any(String),
			}),
			// smartestHero: {
      smartestHero: expect.objectContaining( {
        id: expect.any(String),
        name: expect.any(String),
        slug: expect.any(String),
        alias: expect.any(String),
        powers: expect.any(Array),
        description: expect.any(String),
        strength: expect.any(Number),
        intelligence: expect.any(Number),
        speed: expect.any(Number),
        durability: expect.any(Number),
        team: expect.any(String),
        image: expect.any(String),
        firstAppearance: expect.any(String),
        status: expect.any(String),
        category: expect.any(String),
        universe: expect.any(String),
      }),
			heroCount: expect.any(Number),
			villainCount: expect.any(Number),
		});
	});
});
