import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
	base: "/heroes-frontend/", // 👈 MUY IMPORTANTE (nombre exacto de tu repo en GitHub)
	plugins: [react(), tailwindcss(), tsconfigPaths()],
	test: {
		globals: true,
		environment: "jsdom",
	},
});
