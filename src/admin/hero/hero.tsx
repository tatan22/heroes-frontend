const superheroData = {
	id: "1",
	name: "Clark Kent",
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
	image: "/placeholder.svg?height=300&width=300",
	firstAppearance: "1938",
	status: "Activo",
	category: "Héroe",
	universe: "DC",
};
export default function SuperheroProfile() {
	const totalPower =
		superheroData.strength +
		superheroData.intelligence +
		superheroData.speed +
		superheroData.durability;
	const averagePower = Math.round((totalPower / 4) * 10);

	const getStatusColor = (status: string) => {
		switch (status.toLowerCase()) {
			case "activo":
				return "bg-green-500";
			case "inactivo":
				return "bg-gray-500";
			case "retirado":
				return "bg-blue-500";
			default:
				return "bg-gray-500";
		}
	};

	const getCategoryColor = (category: string) => {
		switch (category.toLowerCase()) {
			case "héroe":
				return "bg-blue-500";
			case "villano":
				return "bg-red-500";
			case "antihéroe":
				return "bg-purple-500";
			default:
				return "bg-gray-500";
		}
	};

	return (
		<div className="p-6 bg-white rounded-lg shadow">
			<h2 className="text-2xl font-bold mb-2">{superheroData.name}</h2>
			<p className="text-gray-600 mb-4">{superheroData.alias}</p>

			<div className="flex items-center gap-2 mb-4">
				<span
					className={`px-2 py-1 text-white rounded ${getCategoryColor(
						superheroData.category
					)}`}
				>
					{superheroData.category}
				</span>
				<span
					className={`px-2 py-1 text-white rounded ${getStatusColor(
						superheroData.status
					)}`}
				>
					{superheroData.status}
				</span>
			</div>

			<p className="mb-2">
				<strong>Promedio de poder:</strong> {averagePower} / 100
			</p>

			<p className="text-gray-700">{superheroData.description}</p>
		</div>
	);
}
