import { defineConfig, envField } from "astro/config";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
	site: "http://localhost:4321",
	output: "server",
	adapter: node({
		mode: "standalone",
	}),
	experimental: {
		env: {
			validateSecrets: false,
			schema: {
				SENDGRID_API_KEY: envField.string({
					context: "server",
					access: "secret",
				}),
			},
		},
	},
});
